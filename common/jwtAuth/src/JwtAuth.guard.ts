// import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtAuth_Key_Name, JwtPayLoad } from '@app/config';
// import { IS_PUBLIC, jwtFromRequest } from '../index';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';
// import { Reflector } from '@nestjs/core';
//
// /** Jwt网关 */
// @Injectable()
// export class JwtAuthGuard extends AuthGuard(JwtAuth_Key_Name) {
//   constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {
//     super();
//   }
//
//   handleAuthToken(context: ExecutionContext): JwtPayLoad {
//     const request = context.switchToHttp().getRequest();
//
//     const info = this.jwtService.decode(jwtFromRequest(request)) as JwtPayLoad;
//
//     request['user'] = info ? info : undefined;
//
//     return info;
//   }
//
//   async canActivate(context: ExecutionContext): Promise<any> {
//     const info = this.handleAuthToken(context);
//
//     if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()])) return true;
//
//     // 添加其他验证
//     return super.canActivate(context);
//   }
//
//   // 可以抛出一个基于 info 或者 err 参数的异常
//   // handleRequest(err, user, info) {
//   //   if (err || !user) {
//   //     throw err || new UnauthorizedException();
//   //   }
//   //   return user;
//   // }
// }
export default {};
