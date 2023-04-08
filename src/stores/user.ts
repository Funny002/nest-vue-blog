import { defineStore } from 'pinia';

interface UsersStores {
  token?: string;
}

export const useUsers = defineStore('users', {
  state: (): UsersStores => ({
    //
  }),
  getters: {
    //
  },
  actions: {
    setInfo() {
      //
    },
    setToken(token: string) {
      //
    },
  },
});
