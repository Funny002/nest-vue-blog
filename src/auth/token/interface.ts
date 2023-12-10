/* 返回值 */
export interface TokenOptions {
  accessToken: string;
  refreshToken: string;
  accessExpires: number;
  refreshExpires: number;
}

export interface TokenPayloadInfo {
  tag: string;
  uid: number;
}

export interface TokenPayload<T = any> {
  exp: number;
  iat: number;
  sub: string;
  data: T;
}

