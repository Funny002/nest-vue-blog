import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { MysqlModel } from '@app/common/mysql';
import { Module } from '@nestjs/common';
import { Setting } from '@app/mysql';

@Module({
  imports: [
    MysqlModel.feature(Setting),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
