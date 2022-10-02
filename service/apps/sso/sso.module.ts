import { AppSystem, ConfigGlobal, JwtAuth, Mysql, Sso, SSO_NAME } from '@app/config';
import { Power, PowerRole, User, UserOauth } from '@app/mysql';
// import { JwtAuthGuard } from '@app/common/jwtAuth';
import { ConfigService } from '@nestjs/config';
import { MysqlModel } from '@app/common/mysql';
// import { JwtService } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
// 应用模块
// import { AuthModule } from './Auth/auth.module';
// import { FileModule } from './File/file.module';
// import { RoleModule } from './Role/role.module';
// import { oAuthModule } from './oAuth/oAuth.module';
import { PowerModule } from './Power/power.module';

@Module({
  imports: [
    // config
    ConfigGlobal.use(Sso, Mysql, JwtAuth),
    // mysql
    MysqlModel.use(Power, PowerRole, User, UserOauth),
    // module
    // AuthModule,
    // oAuthModule,
    // FileModule,
    // RoleModule,
    PowerModule,
  ],
  providers: [
    // JwtService,
    ConfigService,
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class SsoModule {
  static port: number;
  static version: string;
  static limit: AppSystem['limit'];
  static verify: AppSystem['verify'];
  
  constructor(private readonly configService: ConfigService) {
    // 获取配置
    const config = this.configService.get<AppSystem>(SSO_NAME);
    // Api版本
    SsoModule.version = config.version;
    // 管道验证
    SsoModule.verify = config.verify;
    // 请求限制
    SsoModule.limit = config.limit;
    // 服务端口
    SsoModule.port = config.port;
  }
}
