import { SetMetadata } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

/* noAuth */
export const IS_PUBLIC = 'is_public';

/* 跳过权限验证 */
export const NoAuth = () => SetMetadata(IS_PUBLIC, true);

/* 定义令牌位置 */
export const jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromUrlQueryParameter('token'),
  ExtractJwt.fromAuthHeaderWithScheme('token'),
]);

/* jwt_auth name */
export const JwtAuthName = 'jwt_auth_name';

/* roles */
export const IS_ADMIN = 'Is_Admin';

/* roles */
export const IsAdmin = () => SetMetadata(IS_ADMIN, true);
