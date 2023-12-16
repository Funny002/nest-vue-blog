import { Command, CommandOptions } from '../common/command';
import { Setting, SettingPower } from '@mysql';
import { Injectable } from '@nestjs/common';

interface EmailOptions {
  host?: string;
  port?: number;
  tls?: boolean;

  //
  user?: string;
  pass?: string;
  name?: string;
}

@Injectable()
@Command({ name: 'email', description: '邮件服务' })
export class EmailService {
  @CommandOptions([
    { flags: 'user', alias: 'u', values: '<user>', description: '用户' },
    { flags: 'pass', alias: 'p', values: '<user>', description: '密码' },
    { flags: 'host', alias: 'h', values: '<user>', description: '主机' },
    { flags: 'port', alias: 'P', values: '<user>', description: '端口' },
    { flags: 'tls', alias: 't', values: '<user>', description: '是否开启TLS' },
    { flags: 'name', alias: 'n', values: '<user>', description: '发件人名称' },
  ])
  async options() {}

  // 替换设置
  @CommandOptions([{ flags: 'set', alias: 's', description: '配置邮箱设置' }])
  async setConfig(options: EmailOptions) {
    const result: { [key: string]: any } = {};
    for (const curr of Object.keys(options)) {
      if (curr === 'set') continue;
      result[curr] = await this.setSetting(curr, options[curr]);
    }
    console.log(result);
  }

  async setSetting(keys: string, value: any) {
    try {
      if (await Setting.hasKeys({ keys, type: 'email' })) {
        await Setting.update({ keys, type: 'email' }, { value });
      } else {
        const title = ({ user: '用户', pass: '密码', host: '主机', port: '端口', tls: '是否开启TLS', name: '发件人名称' })[keys];
        await Setting.save({ keys, value, type: 'email', title, power: SettingPower.System });
      }
      return true;
    } catch (e) {
      return e.message;
    }
  }
}
