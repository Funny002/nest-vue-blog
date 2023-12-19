import { JwtAuthName as JwtName, JwtAuthOptions } from '@config';
import { jwtFromRequest, JwtAuthName } from '../config';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';

/** Jwt策略 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, JwtAuthName) {
  constructor(private readonly configService: ConfigService) {
    const config = configService.get<JwtAuthOptions>(JwtName);
    super({ jwtFromRequest, ignoreExpiration: false, secretOrKey: config.secret });
  }

  async validate(payload: any): Promise<any> {
    // console.log('[JwtAuthStrategy] validate', payload);
    return payload;
  }
}
