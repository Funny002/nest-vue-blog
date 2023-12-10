import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CodeDto, LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth 登录/注册')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto) {}

  // 注册
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: RegisterDto) {}

  // 退出登录
  @Put('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout() {}

  // 发送验证码
  @Post('sendCode')
  @ApiOperation({ summary: '发送验证码' })
  async sendCode(@Body() body: CodeDto) {}

  // // 重置密码
  // @Put('resetPassword')
  // @ApiOperation({ summary: '重置密码' })
  // async resetPassword() {}

  // 令牌验证
  @Get('tokenVerify')
  @ApiOperation({ summary: '令牌验证' })
  async tokenVerify(@Query('token') token?: string) {}

  // 令牌刷新
  @Put('tokenRefresh')
  @ApiOperation({ summary: '令牌刷新' })
  async tokenRefresh() {}
}
