import { RoleController } from './role.controller';
import { MysqlModel } from '@app/common/mysql';
import { RoleService } from './role.service';
import { Power, Role } from '@app/mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Power, Role),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
