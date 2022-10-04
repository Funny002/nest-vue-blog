import { SsoUserCreateDto, SsoUserLoginDto } from '@app/dto/sso.user.dto';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';

@ApiTags('Auth 登录/注册')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Req() req: Request, @Body() body: SsoUserCreateDto) {
    return (await this.authService.createUser(body)).id;
  }
  
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async Login(@Req() req: Request, @Body() body: SsoUserLoginDto) {
    // 登录
  }
  
  
  @Post('hasToken')
  @ApiOperation({ summary: '验证令牌' })
  async HasToken() {
    // 验证令牌
  }
  
  @Get('Code')
  @ApiOperation({ summary: '获取验证码' })
  async GetCode() {
    // 获取验证码
  }
  
  @Post('Code')
  @ApiOperation({ summary: '发送验证码' })
  async SendCode() {
    // 发送验证码
  }
}
