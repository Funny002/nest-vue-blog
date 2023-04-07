import { JwtAuthModel, JwtAuthService, JwtAuthStrategy, LocalAuthStrategy } from '@app/common/jwtAuth';
import { AuthController } from './auth.controller';
import { MysqlModel } from '@app/common/mysql';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { Users } from '@app/mysql';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtAuthModel,
    MysqlModel.feature(Users),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthService,
    JwtAuthStrategy,
    LocalAuthStrategy,
  ],
})
export class AuthModule {}
