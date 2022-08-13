import { AppSystem, JwtAuth, Sso, SSO_NAME } from '@app/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@app/common/jwtAuth';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
//
import { AuthModule } from '../Auth/auth.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({ isGlobal: true, encoding: 'utf-8', load: [Sso, JwtAuth] }),
    // module
    AuthModule,
    FileModule,
  ],
  providers: [
    JwtService,
    ConfigService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class SsoModule {
  static port: number;
  static version: string;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<AppSystem>(SSO_NAME);

    SsoModule.version = config.version;

    SsoModule.port = config.port;
  }
}
