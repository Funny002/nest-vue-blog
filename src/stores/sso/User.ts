import { defineStore } from 'pinia';

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
