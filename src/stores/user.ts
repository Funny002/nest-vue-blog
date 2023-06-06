import storage from '@utils/storage';
import { defineStore } from 'pinia';

export interface UserInfo {

}

interface UsersStores {
  info?: UserInfo;
  token?: { access: string; refresh: string; };
  expires?: { access: number; refresh: number; };
}

export const useUsers = defineStore('users', {
  state: (): UsersStores => ({
    info: storage.get('users.info'),
    token: storage.get('users.token'),
    expires: storage.get('users.expires'),
  }),
  getters: {
    getInfo: ({ info }) => info,
    accessToken: ({ token }) => token?.access,
    refreshToken: ({ token }) => token?.refresh,
    accessExpires: ({ expires }) => (expires?.access || 0) - ~~(Date.now() / 1000),
    refreshExpires: ({ expires }) => (expires?.refresh || 0) - ~~(Date.now() / 1000),
  },
  actions: {
    setUserData(info: UserInfo, token: { access: string; refresh: string; }, expires: { access: number; refresh: number; }) {
      this.info = info;
      this.token = token;
      this.expires = expires;
      storage.set('users.info', this.info);
      storage.set('users.token', this.token);
      storage.set('users.expires', this.expires);
    },
  },
});
