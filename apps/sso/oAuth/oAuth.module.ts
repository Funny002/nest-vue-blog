import { oAuthGithubService, useGithubOAuth } from './middleware/github.oAuth';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { oAuthOptions } from './middleware/index.oAuth';
import { oAuthController } from './oAuth.controller';
import { SecretKeys } from './secretKeys.service';

@Module({
  controllers: [oAuthController],
  providers: [
    SecretKeys,
    // oAuthGithubService,
  ],
})
export class oAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    const options: oAuthOptions = { tag: 'oAuth', success: '/user', failure: '/error' };
    // github
    // useGithubOAuth(consumer, options);
  }
}
