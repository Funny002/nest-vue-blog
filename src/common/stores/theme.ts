import { defineStore } from 'pinia';

type ThemeLocale = 'zh' | 'en'

interface ThemeStores {
  locale: ThemeLocale;
}

export const useTheme = defineStore('theme', {
  state: (): ThemeStores => ({
    locale: 'zh',
  }),
  getters: {
    //
  },
  actions: {
    // 设置语言，暂时只支持两种
    setLocale(value: ThemeLocale) {
      this.$state.locale = value;
    },
  },
});
