import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      token: '',
    };
  },
  getters: {},
  actions: {},
});
