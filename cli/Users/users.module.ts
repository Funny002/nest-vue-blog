import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
//
import { MysqlModel, Users } from '@mysql';

@Module({
  imports: [
    MysqlModel.feature(Users),
  ],
  providers: [UsersService],
})
export class UsersModule {}
