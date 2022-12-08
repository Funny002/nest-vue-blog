import { defineStore } from 'pinia';

export interface userInfo {
  avatar: string;
  name: string;
  note: string;
}

export const useUserStoresName = 'userStores';

export const useUserStores = defineStore(useUserStoresName, {
  state: () => ({
    //
  }),
  getters: {
    userInfo(): boolean {
      return true;
    },
  },
  actions: {
    //
  },
});
