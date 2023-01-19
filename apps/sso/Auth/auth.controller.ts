import { AuthSendCodeType, SsoAuthCreateDto, SsoAuthLoginDto, SsoAuthSendCodeDto } from '@app/dto/sso.auth.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthService, LocalAuth, NoAuth } from '@app/common/jwtAuth';
import { ManualException } from '@app/common/error';
import { AuthService } from './auth.service';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { User } from '@app/mysql';
import { reWriteObj } from '@app/tools';

@NoAuth()
@ApiTags('Auth 登录/注册')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Req() req: Request, @Body() body: SsoAuthCreateDto) {
    if (!(await this.authService.hasCode(body.user, body.code))) {
      throw new ManualException('验证码错误');
    }

    if (await User.hasKeys({ email: body.user })) {
      throw new ManualException('邮箱已存在');
    }

    return (await this.authService.createUser(body)).id;
  }

  @Post('login')
  @UseGuards(LocalAuth)
  @ApiOperation({ summary: '登录' })
  async Login(@Req() req: Request, @Body() body: SsoAuthLoginDto) {
    const info = reWriteObj(req['user'], ['uid', 'name', 'email']);
    const token = await this.jwtAuthService.createToken(info);
    const [time, accessIn, refreshIn] = [Math.floor(Date.now() / 1000) - 10, 12 * 60 * 60, 24 * 60 * 60];
    //
    return { info, ...token, expiresIn: { access: time + accessIn, refresh: time + refreshIn } };
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
