import { MysqlModel, UsersConf, Users, Setting } from '@mysql';
import { LocalStrategy } from './strategy/local.strategy';
import { TokenService } from './token/token.service';
import { AuthController } from './auth.controller';
import { JwtAuthModel } from '@libs/jwtAuth';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    // jwt
    JwtAuthModel(),
    // mysql
    MysqlModel.feature(Users, UsersConf, Setting),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy],
})
export class AuthModule {}
