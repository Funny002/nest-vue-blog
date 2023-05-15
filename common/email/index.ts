import { EmailService } from './src/Email.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

export { EmailService } from './src/Email.service';