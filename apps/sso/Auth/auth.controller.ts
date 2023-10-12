import { AuthSendCodeType, SsoAuthCreateDto, SsoAuthLoginDto, SsoAuthSendCodeDto } from '@app/dto/sso.auth.dto';
import { JwtAuthGuard, JwtAuthService, jwtFromRequest, NoAuth } from '@app/common/jwtAuth';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LocalAuth } from './strategy/localAuth.strategy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { AuthRedisServer } from '@app/common/redis';
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
    private readonly redisServer: AuthRedisServer,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuth)
  @ApiOperation({ summary: '登录' })
  async Login(@Req() req: Request, @Body() body: SsoAuthLoginDto) {
    const info = reWriteObj(req['user'], ['uid', 'name', 'email']) as { uid: number; name: string; email: string; tags: string };
    info.tags = body.tags || 'web';
    const token = await this.jwtAuthService.createToken(info);
    const [time, accessIn, refreshIn] = [Math.floor(Date.now() / 1000) - 10, 12 * 3600, 24 * 3600];
    const expires = { access: time + accessIn, refresh: time + refreshIn };
    await this.redisServer.setToken(info.uid, info.tags, token, expires);
    return { info, ...token, expires };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '退出登录' })
  async Logout(@Req() req: Request, @Query('tags') tags?: string) {
    await this.redisServer.delToken(req['user']['uid'], tags || 'web', jwtFromRequest(req));
  }

  @Get('hasToken')
  @ApiOperation({ summary: '验证令牌' })
  async HasToken(@Req() req: Request, @Query() query: { tags?: string; token: string }) {
    return await this.redisServer.hasToken(req['user']['uid'], query.tags || 'web', jwtFromRequest(req));
  }

  @Get('refreshToken')
  @ApiOperation({ summary: '刷新令牌' })
  async RefreshToken(@Req() req: Request, @Query() query: { tags?: string; token: string }) {
    return await this.redisServer.hasToken(req['user']['uid'], query.tags || 'web', jwtFromRequest(req));
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Req() req: Request, @Body() body: SsoAuthCreateDto) {
    if (!(await this.authService.hasCode(body.user, body.code))) ManualException('验证码错误');
    if (await Users.hasKeys({ email: body.user })) ManualException('邮箱已存在');
    return (await this.authService.createUser(body)).id;
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