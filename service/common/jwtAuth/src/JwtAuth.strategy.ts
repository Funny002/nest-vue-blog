import { JwtAuthOptions, JwtAuth_NAME, JwtAuth_Key_Name, JwtPayLoad } from '@app/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, JwtAuth_Key_Name) {
  constructor(private readonly configService: ConfigService) {
    const config = configService.get<JwtAuthOptions>(JwtAuth_NAME);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayLoad): Promise<JwtPayLoad> {
    return payload;
  }
}
