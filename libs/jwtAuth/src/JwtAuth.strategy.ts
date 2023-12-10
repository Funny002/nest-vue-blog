import { jwtFromRequest, JwtAuthName as JwtName } from '../config';
import { JwtAuthName, JwtAuthOptions } from '@config';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';

/** Jwt策略 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, JwtName) {
  constructor(private readonly configService: ConfigService) {
    const config = configService.get<JwtAuthOptions>(JwtAuthName);
    super({ jwtFromRequest, ignoreExpiration: false, secretOrKey: config.secret });
  }

  async validate(payload: any): Promise<any> {
    return payload;
  }
}
