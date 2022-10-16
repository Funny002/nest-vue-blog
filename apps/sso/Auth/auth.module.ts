import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MysqlModel } from '@app/common/mysql';
import { User } from '@app/mysql';

// import { JwtAuthModel } from '@app/common/JwtAuth';

@Module({
  // imports: [JwtAuthModel],
  imports: [
    MysqlModel.feature(User),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
