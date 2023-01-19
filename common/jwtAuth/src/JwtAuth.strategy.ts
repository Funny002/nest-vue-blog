import { JwtAuthOptions, JwtAuth_NAME, JwtAuth_Key_Name, JwtPayLoad } from '@app/config';
import { jwtFromRequest } from '@app/common/jwtAuth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';

/** Jwt策略 */
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, JwtAuth_Key_Name) {
  logger = new Logger(JwtAuthStrategy.name);

  constructor(private readonly configService: ConfigService) {
    const config = configService.get<JwtAuthOptions>(JwtAuth_NAME);
    super({ jwtFromRequest, ignoreExpiration: false, secretOrKey: config.secret });
  }

  async validate(payload: JwtPayLoad): Promise<JwtPayLoad> {
    this.logger.log('validate', payload);
    return payload;
  }
}
