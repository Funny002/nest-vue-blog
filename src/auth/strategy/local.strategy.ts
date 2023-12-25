import { ManualHttpException, UsersException } from '@libs/error';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Users, UsersConf, UserState } from '@mysql';
import { Injectable } from '@nestjs/common';
import { createPass } from '@libs/crypto';
import { Strategy } from 'passport-local';
import { HasEmail } from '@utils/verify';

const LocalAuthName = 'localAuth';

/** 账号登录策略 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalAuthName) {
  constructor() {
    super({ usernameField: 'user', passwordField: 'pass' });
  }

  async validate(user: string, pass: string) {
    const where = HasEmail(user) ? { email: user } : { user };

    // 获取信息
    const userInfo = await Users.getInfoKeys(where);

    // 账号不存在
    if (!userInfo) ManualHttpException('账号/邮箱不存在');

    // 验证状态
    if (userInfo.state !== UserState.ENABLE) new UsersException(<UserState>userInfo.state);

    // 验证
    await this.handlerUserVerify(userInfo, pass);

    // 返回值
    return userInfo;
  }

  async handlerUserVerify(userInfo: Users, pass: string) {
    let conf = await UsersConf.getInfoKeys({ uid: userInfo.uid });
    if (!conf) conf = await UsersConf.save({ uid: userInfo.uid });

    // 锁定
    let isLock = false;
    if (conf.lock_count && conf.lock_time) {
      const time = parseInt(conf.lock_time) - Date.now();
      if (time > 0) {
        isLock = true;
        ManualHttpException(`请在${Math.ceil(time / 1000)}秒后重新尝试`);
      }
    }

    const verifyPass = createPass(userInfo.email, pass);
    if (verifyPass === userInfo.pass) {
      if (isLock) {
        await UsersConf.update({ uid: userInfo.uid }, { lock_time: '', lock_count: 0 });
      }
      await UsersConf.update({ uid: userInfo.uid }, { lest_login_time: new Date() });
      return true;
    }

    // 累计 + 1
    await UsersConf.increment({ uid: userInfo.uid }, 'lock_count', 1);

    // 10次，锁定账号
    if (conf.lock_count >= 10) {
      await Users.update({ uid: userInfo.uid }, { state: UserState.LOCK });
      return ManualHttpException('账号已经锁定，请重置密码后重试。');
    }

    // 大于3次后, 累计 n次，锁n分钟
    const time = ((conf.lock_count > 2 ? conf.lock_count : 1) * 60000);
    await UsersConf.update({ uid: userInfo.uid }, { lock_time: String(time + Date.now()) });
    ManualHttpException(`请${time / 60000}分钟后重试`);
  }
}

export const LocalAuth = AuthGuard(LocalAuthName);
