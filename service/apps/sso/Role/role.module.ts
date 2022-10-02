import { RoleController } from './role.controller';
import { MysqlModel } from '@app/common/mysql';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';
import { PowerRole } from '@app/mysql';

@Module({
  imports: [
    MysqlModel.feature(PowerRole),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
