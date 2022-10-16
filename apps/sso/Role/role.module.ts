import { RoleController } from './role.controller';
import { MysqlModel } from '@app/common/mysql';
import { Power, PowerRole } from '@app/mysql';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Power, PowerRole),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
