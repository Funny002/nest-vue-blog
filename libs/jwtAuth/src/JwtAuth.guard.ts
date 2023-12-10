import { IS_PUBLIC, JwtAuthName, jwtFromRequest } from '../config';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

/** Jwt网关 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtAuthName) {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {
    super();
  }

  handleAuthToken(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();

    const info = this.jwtService.decode(jwtFromRequest(request));

    request['user'] = info ? info : undefined;

    return info;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const info = this.handleAuthToken(context);

    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()])) return true;

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
