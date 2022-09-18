import { Injectable, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { oAuthModel, SecretKeys } from '../secretKeys.service';
import { Strategy } from 'passport-google-oidc';
import { oAuthOptions } from './index.oAuth';
import passport from 'passport';

/**
 * 加载 oAuth
 * @param consumer
 * @param option
 */
export function useGoggleOAuth(consumer: MiddlewareConsumer, option: oAuthOptions) {
  // github Login
  consumer.apply(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })).forRoutes({ path: `/${option.tag}/google`, method: RequestMethod.GET });
  // github Callback
  consumer.apply(passport.authenticate('google', {
    successRedirect: option.success,
    failureRedirect: option.failure,
  })).forRoutes({ path: `/${option.tag}/google/callback`, method: RequestMethod.GET });
}

/** oAuthService */
export const oAuthGoogleService = oAuthModel.use('oAuthGoogleService', async function (secretKeys: SecretKeys) {
  const keys = await secretKeys.getGoogleKeys();
  return new Strategy(keys, function (issuer, profile, callback) {
    console.log({ issuer, profile });
    callback(null, { issuer, profile });
  });
});

// /** oAuthService */
// @Injectable()
// export class oAuthGoogleService {
//   constructor(private readonly secretKeys: SecretKeys) {}
//
//   async usePassport() {
//     const keys = await this.secretKeys.getGoogleKeys();
//     return passport.use(new Strategy(keys, function(issuer, profile, callback) {
//       console.log({ issuer, profile });
//       callback(null, { issuer, profile });
//     }));
//   }
// }
