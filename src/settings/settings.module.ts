import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { MysqlModel, Setting } from '@mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Setting)
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
