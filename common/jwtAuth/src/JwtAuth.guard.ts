import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtAuth_Key_Name } from '@app/config';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC, jwtFromRequest } from '../index';

/** Jwt网关 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtAuth_Key_Name) {
  logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  handleAuthToken(context: ExecutionContext): void {

  }

  async canActivate(context: ExecutionContext): Promise<any> {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()])) return true;
    // 添加其他验证
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // const request = context.switchToHttp().getRequest();
    // const token = jwtFromRequest(request);
    // if (token) request['user'] = this.jwtService.verify(token);
    this.logger.log('handleRequest', { err, user, info });
    // 可以抛出一个基于 info 或者 err 参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
