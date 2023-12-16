import { Injectable } from '@nestjs/common';
import { Command, CommandOptions } from '../common/command';

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
    { flags: 'user', alias: 'u', description: '用户' },
    { flags: 'pass', alias: 'p', description: '密码' },
    { flags: 'host', alias: 'h', description: '主机' },
    { flags: 'port', alias: 'P', description: '端口' },
    { flags: 'tls', alias: 't', description: '是否开启TLS' },
    { flags: 'name', alias: 'n', description: '发件人名称' },
  ])
  async options() {}

  // 替换设置
  @CommandOptions([{ flags: 'set', alias: 's', description: '配置邮箱设置' }])
  async setConfig(options: EmailOptions) {
  }
}
