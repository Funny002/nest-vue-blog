import { ManualException, UserException } from '@app/common/error';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Users, BaseState } from '@app/mysql';
import { Injectable } from '@nestjs/common';
import { HasEmail, md5 } from '@app/tools';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';

const LocalAuthName = 'localAuth';

/** 账号登录策略 */
@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, LocalAuthName) {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {
    super({ usernameField: 'user', passwordField: 'pass' });
  }

  async validate(user: string, pass: string) {
    const where = HasEmail(user) ? { email: user } : { name: user };
    // 验证
    if (!(await Users.hasKeys(where))) ManualException('账号/邮箱不存在');
    // 获取信息
    const userInfo = await Users.getInfoKeys(where);
    // 验证状态
    await this.handleUserState(userInfo);
    // 验证密码
    await this.handleUserPassword(userInfo, pass);
    // 返回
    return userInfo;
  }

  async handleUserState(userInfo: Users) {
    if (userInfo.state !== BaseState.Enable) UserException(userInfo.state);
    if (userInfo.lock_count && userInfo.lock_time) {
      const time = parseInt(userInfo.lock_time) - Date.now();
      if (time > 0) ManualException(`请在${ Math.ceil(time / 1000) }秒后重新尝试`);
    }
  }

  async handleUserPassword(userInfo: Users, pass: string) {
    const verifyPass = md5(md5(userInfo.email) + pass);
    // 密码匹配成功
    if (verifyPass === userInfo.pass) {
      await this.userRepository.update({ id: userInfo.id }, { lock_time: '', lock_count: 0 });
      return true;
    }
    // 大于2次 累计n次锁n分钟
    if (userInfo.lock_count === 2) {
      await this.userRepository.update({ id: userInfo.id }, { lock_time: (Date.now() + (userInfo.lock_count * 60000)).toString() });
    }
    // 累计 + 1
    await Users.increment({ id: userInfo.id }, 'lock_count', 1);
    ManualException('密码验证失败');
  }
}

export const LocalAuth = AuthGuard(LocalAuthName);
