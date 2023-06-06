import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuth_NAME, JwtAuthOptions, JwtInfo } from '@app/config';

/** JWT方法 */
@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(payload: JwtInfo) {
    const conf = this.configService.get<JwtAuthOptions>(JwtAuth_NAME);
    const access = await this.jwtService.signAsync(payload, { expiresIn: conf.expiresIn });
    const refresh = await this.jwtService.signAsync(payload, { expiresIn: conf.refreshIn });
    return { access, refresh };
  }
}
