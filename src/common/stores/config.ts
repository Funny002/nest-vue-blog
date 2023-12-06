import storage from '@utils/storage';
import { defineStore } from 'pinia';

interface ConfigStores {
  logo: string;
  title: string;
}

export const useWebConfig = defineStore('web-config', {
  state: (): ConfigStores => ({
    logo: storage.get('logo') || '',
    title: storage.get('title') || '',
  }),
  getters: {
    getLogo: ({ logo }) => logo,
  },
  actions: {
    setLogo(value: string) {
      storage.set('logo', value);
      this.$state.logo = value;
    },
    setTitle(value: string) {
      storage.set('title', value);
      this.$state.title = value;
    },
  },
});
