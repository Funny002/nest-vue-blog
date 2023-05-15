import { AppSystem, Captcha, ConfigGlobal, Email, JwtAuth, Mysql, Redis, Redis_Name, RedisOptions, Sso, SSO_NAME } from '@app/config';
import { Menu, Power, Role, Setting, UserOauth, Users } from '@app/mysql';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { JwtAuthGuard } from '@app/common/jwtAuth';
import { MysqlModel } from '@app/common/mysql';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
// 应用模块
import { AuthModule } from './Auth/auth.module';
// import { FileModule } from './File/file.module';
// import { RoleModule } from './Role/role.module';
import { MenuModule } from './Menu/menu.module';
// import { PowerModule } from './Power/power.module';
// import { SettingModule } from './Setting/setting.module';

@Module({
  imports: [
    // config
    ConfigGlobal.use(Sso, Mysql, Redis, JwtAuth, Email, Captcha),
    // mysql
    MysqlModel.use(Users, UserOauth, Menu, Role, Power, Setting),
    // redis
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { config: configService.get<RedisOptions>(Redis_Name) };
      },
    }),
    // module
    AuthModule,
    // FileModule,
    // RoleModule,
    MenuModule,
    // PowerModule,
    // SettingModule,
  ],
  providers: [
    JwtService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
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
