// import { JwtAuthOptions, JwtAuth_NAME, JwtAuth_Key_Name, JwtPayLoad } from '@app/config';
// import { jwtFromRequest } from '@app/common/jwtAuth';
// import { PassportStrategy } from '@nestjs/passport';
// import { ConfigService } from '@nestjs/config';
// import { Injectable } from '@nestjs/common';
// import { Strategy } from 'passport-jwt';
//
// /** Jwt策略 */
// @Injectable()
// export class JwtAuthStrategy extends PassportStrategy(Strategy, JwtAuth_Key_Name) {
//   constructor(private readonly configService: ConfigService) {
//     const config = configService.get<JwtAuthOptions>(JwtAuth_NAME);
//     super({ jwtFromRequest, ignoreExpiration: false, secretOrKey: config.secret });
//   }
//
//   async validate(payload: JwtPayLoad): Promise<JwtPayLoad> {
//     return payload;
//   }
// }
export default {};
