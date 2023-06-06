import { AuthSendCodeType, SsoAuthCreateDto, SsoAuthLoginDto, SsoAuthSendCodeDto } from '@app/dto/sso.auth.dto';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthService, NoAuth } from '@app/common/jwtAuth';
import { LocalAuth } from './strategy/localAuth.strategy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { RedisServer } from '@app/common/redis';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { reWriteObj } from '@app/tools';
import { Users } from '@app/mysql';
import { Request } from 'express';

@NoAuth()
@ApiTags('Auth 登录/注册')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly redisServer: RedisServer,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Req() req: Request, @Body() body: SsoAuthCreateDto) {
    if (!(await this.authService.hasCode(body.user, body.code))) ManualException('验证码错误');

    if (await Users.hasKeys({ email: body.user })) ManualException('邮箱已存在');

    return (await this.authService.createUser(body)).id;
  }

  @Post('login')
  @UseGuards(LocalAuth)
  @ApiOperation({ summary: '登录' })
  async Login(@Req() req: Request, @Body() body: SsoAuthLoginDto) {
    const info = reWriteObj(req['user'], ['uid', 'name', 'email']) as { uid: number, name: string, email: string, tags: string };
    info.tags = body.tags || 'web';
    const token = await this.jwtAuthService.createToken(info);
    const [time, accessIn, refreshIn] = [Math.floor(Date.now() / 1000) - 10, 12 * 60 * 60, 24 * 60 * 60];
    await this.redisServer.setAuthToken(info.uid, info.tags, token, { access: accessIn, refresh: refreshIn });
    return { info, ...token, expires: { access: time + accessIn, refresh: time + refreshIn } };
  }

  @Get('hasToken')
  @ApiOperation({ summary: '验证令牌' })
  async HasToken(@Query('token') token: string) {
    const decode = this.jwtService.decode(token) as { exp: number; iat: number; [k: string]: any };
    const num = (decode || { exp: 0, iat: 0 }).exp - Math.floor(Date.now() / 1000);
    if (num <= 0) return false;
    const state = await this.redisServer.hasAuthToken(decode.uid, decode.tags || 'web', token);
    if (!state) return false;
    return num;
  }

  @Get('code')
  @ApiOperation({ summary: '获取验证码' })
  async GetCode() {
    // 获取验证码
  }

  @Post('code')
  @ApiOperation({ summary: '发送验证码' })
  async SendCode(@Req() req: Request, @Body() body: SsoAuthSendCodeDto) {
    if (await Users.hasKeys({ email: body.email })) ManualException('邮箱已存在');

    switch (body.state) {
      case AuthSendCodeType.email:
        return await this.authService.sendCodeEmail(req, body.email);

      case AuthSendCodeType.phone:
        return await this.authService.sendCodePhone(req, body.email);

      default:
        ManualException('未知异常');
    }
  }
}
