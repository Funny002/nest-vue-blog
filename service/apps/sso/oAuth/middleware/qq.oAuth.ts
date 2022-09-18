import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { oAuthModel, SecretKeys } from '../secretKeys.service';
import { oAuthOptions } from './index.oAuth';
import { Strategy } from 'passport-qq';
import passport from 'passport';

/**
 * 加载 oAuth
 * @param consumer
 * @param option
 */
export function useQQOAuth(consumer: MiddlewareConsumer, option: oAuthOptions) {
  // github Login
  consumer.apply(passport.authenticate('qq', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })).forRoutes({ path: `/${option.tag}/qq`, method: RequestMethod.GET });
  // github Callback
  consumer.apply(passport.authenticate('qq', {
    successRedirect: option.success,
    failureRedirect: option.failure,
  })).forRoutes({ path: `/${option.tag}/qq/callback`, method: RequestMethod.GET });
}

/** oAuthService */
export const oAuthQQService = oAuthModel.use('oAuthQQService', async function (secretKeys: SecretKeys) {
  const keys = await secretKeys.getQQKeys();
  return new Strategy(keys, function (accessToken, refreshToken, profile, callback) {
    console.log({ accessToken, refreshToken, profile });
    callback(null, { accessToken, refreshToken, profile });
  });
});

// /** oAuthService */
// @Injectable()
// export class oAuthQQService implements Strategy{
//   constructor(private readonly secretKeys: SecretKeys) {}
//   async usePassport() {
//     const keys = await this.secretKeys.getQQKeys();
//     return passport.use(new Strategy(keys, function(accessToken, refreshToken, profile, callback) {
//       console.log({ accessToken, refreshToken, profile });
//       callback(null, { accessToken, refreshToken, profile });
//     }));
//   }
// }
