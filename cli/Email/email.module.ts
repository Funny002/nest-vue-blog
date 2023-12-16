import { EmailService } from './email.service';
import { MysqlModel, Setting } from '@mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [MysqlModel.feature(Setting)],
  providers: [EmailService],
})
export class EmailModule {}
