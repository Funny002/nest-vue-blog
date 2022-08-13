import { JwtAuth_NAME, JwtAuthOptions } from '@app/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './JwtAuth.service';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const conf = configService.get<JwtAuthOptions>(JwtAuth_NAME);
        return {
          secret: conf.secret,
          signOptions: { expiresIn: conf.expiresIn },
        };
      },
    }),
  ],
  providers: [ConfigService, JwtService, JwtAuthService],
  exports: [JwtModule, JwtService, JwtAuthService],
})
export class JwtAuthModel {}
