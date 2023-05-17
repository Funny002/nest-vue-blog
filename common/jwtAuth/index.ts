import { JwtAuth_NAME, JwtAuthOptions } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { SetMetadata } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { JwtModule } from '@nestjs/jwt';

export * from './src/JwtAuth.guard';
export * from './src/JwtAuth.service';
export * from './src/JwtAuth.strategy';
// export * from '../../apps/sso/Auth/strategy/localAuth.strategy';

/** noAuth */
export const IS_PUBLIC = 'is_public';

/** 跳过权限验证 */
export const NoAuth = () => SetMetadata(IS_PUBLIC, true);

/** 定义令牌位置 */
export const jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromUrlQueryParameter('token'),
  ExtractJwt.fromAuthHeaderWithScheme('token'),
]);

/** Jwt模块 */
export const JwtAuthModel = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const conf = configService.get<JwtAuthOptions>(JwtAuth_NAME);
    return { secret: conf.secret, signOptions: { expiresIn: conf.expiresIn } };
  },
});
