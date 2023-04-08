import { JwtAuthModel, JwtAuthService, JwtAuthStrategy, LocalAuthStrategy } from '@app/common/jwtAuth';
import { AuthController } from './auth.controller';
import { EmailModule } from '@app/common/email';
import { RedisModule } from '@app/common/redis';
import { MysqlModel } from '@app/common/mysql';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Users } from '@app/mysql';

@Module({
  imports: [
    JwtAuthModel,
    // redis
    RedisModule,
    // email
    EmailModule,
    // mysql
    MysqlModel.feature(Users),
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    JwtAuthService,
    JwtAuthStrategy,
    LocalAuthStrategy,
  ],
})
export class AuthModule {}
