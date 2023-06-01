import storage from '@utils/storage';
import { defineStore } from 'pinia';

export interface UserInfo {

}

interface UsersStores {
  token?: string;
  info?: UserInfo;
}

export const useUsers = defineStore('users', {
  state: (): UsersStores => ({
    info: storage.get('users.info'),
    token: storage.get('users.token'),
  }),
  getters: {
    getInfo: ({ info }) => info,
  },
  actions: {
    setUserData(info: any, token: string) {
      this.info = info;
      this.token = token;
      storage.set('users.info', this.info);
      storage.set('users.token', this.token);
    },
  },
});
