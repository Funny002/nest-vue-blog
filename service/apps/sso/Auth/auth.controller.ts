import { Controller, Get, Post, Version } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@ApiBasicAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login() {
    // 登录
  }

  @Post('register')
  async Register() {
    // 注册
  }

  @Post('hasToken')
  async HasToken() {
    // 验证令牌
  }

  @Get('Code')
  async GetCode() {
    // 获取验证码
  }

  @Version('2')
  @Post('Code')
  async SendCode() {
    // 发送验证码
  }
}
