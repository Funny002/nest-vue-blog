import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CodeDto, LoginDto, RegisterDto } from './dto';
import { LocalAuth } from './strategy/local.strategy';
import { TokenService } from './token/token.service';
import { ManualHttpException } from '@libs/error';
import { AuthService } from './auth.service';
import { reWriteObj } from '@utils/object';
import { IpAddress } from '@libs/other';
import { NoAuth } from '@libs/jwtAuth';
import { Users } from '@mysql';

@NoAuth()
@Controller('auth')
@ApiTags('auth 登录/注册')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly token: TokenService,
  ) {}

  // 登录
  @Post('login')
  @UseGuards(LocalAuth)
  @ApiOperation({ summary: '登录' })
  async login(@Req() req: Request, @Body() body: LoginDto) {
    const userInfo = reWriteObj(req['user'], ['uid', 'name', 'user', 'email', 'is_save_name', 'avatar', 'create_time']);
    const tokenInfo = this.token.createToken(userInfo);
    await this.token.setToken(userInfo.uid, tokenInfo);
    return { user: userInfo, token: tokenInfo };
  }

  // 注册
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Req() req: Request, @Body() body: RegisterDto) {
    if (await Users.findOne({ where: { email: body.user } })) return ManualHttpException('邮箱已注册');
    return { body, headers: req.headers };
  }

  // 退出登录
  @Put('logout')
  @ApiOperation({ summary: '退出登录' })
  async logout() {}

  // // 重置密码
  // @Put('resetPassword')
  // @ApiOperation({ summary: '重置密码' })
  // async resetPassword() {}

  // 令牌刷新
  @Put('tokenRefresh')
  @ApiOperation({ summary: '令牌刷新' })
  async tokenRefresh() {}

  // 发送验证码
  @Post('sendCode')
  @ApiOperation({ summary: '发送验证码' })
  async sendCode(@IpAddress() ip: string, @Body() body: CodeDto) {
    if (await Users.findOne({ where: { email: body.email } })) return ManualHttpException('邮箱已注册');
    await this.auth.sendCode(ip, body.email);
    return '邮件发送成功';
  }

  // 令牌验证
  @Get('tokenVerify')
  @ApiOperation({ summary: '令牌验证' })
  async tokenVerify(@Query('token') token?: string) {}
}
