import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Injectable } from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class SecretKeys {
  async getGithubKeys() {
    return { clientID: '', clientSecret: '', callbackURL: '' };
  }
  
  async getGoogleKeys() {
    return { clientID: '', clientSecret: '', callbackURL: '' };
  }
  
  async getQQKeys() {
    return { clientID: '', clientSecret: '', callbackURL: '' };
  }
}

export class oAuthModel {
  static use(name, oAuthFunc: (secretKeys: SecretKeys) => any): Provider {
    return {
      provide: name,
      inject: [SecretKeys],
      useFactory: async (secretKeys: SecretKeys) => {
        return passport.use(await oAuthFunc(secretKeys));
      },
    };
  }
}
