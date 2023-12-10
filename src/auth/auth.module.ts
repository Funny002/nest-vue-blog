import { MysqlModel, UserConf, Users } from '@mysql';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Users, UserConf),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
