export interface oAuthOptions {
  tag: string;
  success: string;
  failure: string;
}

interface AccountInfo {
  id: string;
  token: string;
}

export interface UserModel {
  email?: string;
  image?: string;
  displayName: string;
  googleAccount?: AccountInfo;
  githubAccount?: AccountInfo;
}

export * from './google.oAuth';
export * from './github.oAuth';
