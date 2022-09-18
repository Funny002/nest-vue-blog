import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuth_Key_Name } from '@app/config';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../index';

/** Jwt网关 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(JwtAuth_Key_Name) {
  //
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    //
    if (isPublic) {
      return true;
    }
    // 添加其他验证
    return true;
  }
}
