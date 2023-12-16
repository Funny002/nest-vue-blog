import { Global, Module } from '@nestjs/common';
import { MysqlModel, Setting } from '@mysql';
import { EmailService } from '@libs/email';

@Global()
@Module({
  imports: [
    MysqlModel.feature(Setting),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
