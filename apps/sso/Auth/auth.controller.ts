import { AuthSendCodeType, SsoAuthCreateDto, SsoAuthLoginDto, SsoAuthSendCodeDto } from '@app/dto/sso.auth.dto';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '@app/mysql';

@ApiTags('Auth 登录/注册')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Req() req: Request, @Body() body: SsoAuthCreateDto) {
    if (!(await this.authService.hasCode(body.email, body.code))) {
      throw new ManualException('验证码错误');
    }
    
    if (await User.hasKeys({ email: body.email })) {
      throw new ManualException('邮箱已存在');
    }
    
    return (await this.authService.createUser(body)).id;
  }
  
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async Login(@Req() req: Request, @Body() body: SsoAuthLoginDto) {
    const user = await User.getInfoKeys({ email: body.email });
    
    if (!user) {
      throw new ManualException('邮箱不存在');
    }
  }
  
  @Get('hasToken')
  @ApiOperation({ summary: '验证令牌' })
  async HasToken() {
    // 验证令牌
  }
  
  @Get('code')
  @ApiOperation({ summary: '获取验证码' })
  async GetCode() {
    // 获取验证码
  }
  
  @Post('code')
  @ApiOperation({ summary: '发送验证码' })
  async SendCode(@Req() req: Request, @Body() body: SsoAuthSendCodeDto) {
    if (await User.hasKeys({ email: body.email })) {
      throw new ManualException('邮箱已存在');
    }
    
    switch (body.state) {
      case AuthSendCodeType.email:
        return await this.authService.sendCodeEmail(req, body.email);
      
      case AuthSendCodeType.phone:
        return await this.authService.sendCodePhone(req, body.email);
      
      default:
        throw new ManualException('未知异常');
    }
  }
}
