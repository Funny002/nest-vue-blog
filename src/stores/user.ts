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
  state: (): { data: UsersStores } => ({
    data: {
      info: storage.get('users.info'),
      token: storage.get('users.token'),
      expires: storage.get('users.expires'),
    },
  }),
  getters: {
    getInfo: ({ data: { info } }) => info,
    accessToken: ({ data: { token } }) => token?.access,
    refreshToken: ({ data: { token } }) => token?.refresh,
    accessExpires: ({ data: { expires } }) => (expires?.access || 0) - ~~(Date.now() / 1000),
    refreshExpires: ({ data: { expires } }) => (expires?.refresh || 0) - ~~(Date.now() / 1000),
  },
  actions: {
    updateStorage() {
      storage.set('users.info', this.data.info, 0, false, false);
      storage.set('users.token', this.data.token, 0, false, false);
      storage.set('users.expires', this.data.expires, 0, false, false);
    },
    setUserData(info: UserInfo, token: { access: string; refresh: string; }, expires: { access: number; refresh: number; }) {
      this.data.expires = expires;
      this.data.token = token;
      this.data.info = info;
      this.updateStorage();
    },
    logout() {
      this.data = {};
      this.updateStorage();
    },
  },
});
