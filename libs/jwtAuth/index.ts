import { JwtAuthName, JwtAuthOptions } from '@config';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/** Jwt模块 */
export const JwtAuthModel = () => {
  return JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return configService.get<JwtAuthOptions>(JwtAuthName);
    },
  });
};

export * from './config';
export * from './src/JwtAuth.guard';
export * from './src/JwtAuth.strategy';
