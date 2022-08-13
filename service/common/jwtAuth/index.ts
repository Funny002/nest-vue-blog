import { SetMetadata } from '@nestjs/common';
// guard
export * from './src/JwtAuth.guard';
// model service
export * from './src/JwtAuth.module';
// strategy
export * from './src/JwtAuth.strategy';
// noAuth
export const IS_PUBLIC = 'is_public';
//
export const noAuth = () => SetMetadata(IS_PUBLIC, true);
