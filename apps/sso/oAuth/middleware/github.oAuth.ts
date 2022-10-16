import { Injectable, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { oAuthOptions, UserModel } from './index.oAuth';
import { oAuthModel, SecretKeys } from '../secretKeys.service';
import { Strategy } from 'passport-github2';
import * as passport from 'passport';

/**
 * 加载 oAuth
 * @param consumer
 * @param option
 */
export function useGithubOAuth(consumer: MiddlewareConsumer, option: oAuthOptions) {
  // github Login
  consumer.apply(passport.authenticate('github', {
    scope: ['email'],
  })).forRoutes({ path: `/${option.tag}/github`, method: RequestMethod.GET });
  // github Callback
  consumer.apply(passport.authenticate('github', {
    successRedirect: option.success,
    failureRedirect: option.failure,
  })).forRoutes({ path: `/${option.tag}/github/callback`, method: RequestMethod.GET });
}

/** oAuthService */
export const oAuthGithubService = oAuthModel.use('oAuthGithubService', async function (secretKeys: SecretKeys) {
  const keys = await secretKeys.getGithubKeys();
  return new Strategy(keys, function (accessToken, refreshToken, profile, callback) {
    console.log({ accessToken, refreshToken, profile });
    callback(null, { accessToken, refreshToken, profile });
  });
});

// /** oAuthService */
// @Injectable()
// export class oAuthGithubService {
//   constructor(private readonly secretKeys: SecretKeys) {
//   }
//
//   async usePassport() {
//     const keys = await this.secretKeys.getGithubKeys();
//     return passport.use(new Strategy(keys, function (accessToken, tokenSecret, profile, callback) {
//       console.log({ accessToken, tokenSecret, profile });
//       callback(null, { accessToken, tokenSecret, profile });
//     }));
//   }
// }
