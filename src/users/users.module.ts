import { MysqlModel, UserConf, Users } from '@mysql';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Users, UserConf),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
