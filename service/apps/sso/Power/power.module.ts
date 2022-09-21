import { PowerController } from './power.controller';
import { MysqlModel } from '@app/common/mysql';
import { PowerService } from './power.service';
import { Module } from '@nestjs/common';
import { Power } from '@app/mysql';

@Module({
  imports: [
    MysqlModel.feature(Power),
  ],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}
