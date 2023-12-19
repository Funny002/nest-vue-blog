import { IS_ADMIN, IS_PUBLIC, JwtAuthName, jwtFromRequest } from '../config';
import { TokenService } from '../../../src/auth/token/token.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ManualHttpException } from '@libs/error';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Users } from '@mysql';

/** Jwt网关 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtAuthName) {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {super();}

  handleAuthToken(request: any): any {
    const info = this.jwtService.decode(jwtFromRequest(request));

    request['user'] = info ? info : undefined;

    return info;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const info = this.handleAuthToken(request);

    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()])) return true;

    if (!(await this.tokenService.hasToken(jwtFromRequest(request)))) return ManualHttpException('令牌无效');

    const roles = this.reflector.getAllAndOverride<boolean>(IS_ADMIN, [context.getHandler(), context.getClass()]);

    if (roles) {
      const userInfo = await Users.getInfoKeys({ uid: info.uid }, { role: true });
      if (userInfo.role !== 'admin') return ManualHttpException('暂无权限。');
    }

    // 添加其他验证
    return super.canActivate(context);
  }

  // 可以抛出一个基于 info 或者 err 参数的异常
  // handleRequest(err, user, info) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
