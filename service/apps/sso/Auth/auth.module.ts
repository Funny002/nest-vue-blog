import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthModel } from '@app/common/JwtAuth';

@Module({
  imports: [JwtAuthModel],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
