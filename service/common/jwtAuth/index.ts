import { SetMetadata } from '@nestjs/common';

export * from './src/JwtAuth.guard';
export * from './src/JwtAuth.module';
export * from './src/JwtAuth.service';
export * from './src/JwtAuth.strategy';

/** noAuth */
export const IS_PUBLIC = 'is_public';
/** 跳过权限验证 */
export const noAuth = () => SetMetadata(IS_PUBLIC, true);
