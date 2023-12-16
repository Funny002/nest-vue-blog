import { LocalStrategy } from './strategy/local.strategy';
import { MysqlModel, UsersConf, Users } from '@mysql';
import { TokenService } from './token/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthModel } from '@libs/jwtAuth';
import { EmailService } from '@libs/email';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // jwt
    JwtAuthModel(),
    // mysql
    MysqlModel.feature(Users, UsersConf),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, EmailService, LocalStrategy],
})
export class AuthModule {}
