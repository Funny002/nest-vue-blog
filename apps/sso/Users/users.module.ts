import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MysqlModel } from '@app/common/mysql';
import { Module } from '@nestjs/common';
import { Users } from '@app/mysql';

@Module({
  imports: [
    MysqlModel.feature(Users),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
