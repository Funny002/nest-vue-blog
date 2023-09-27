import { defineAsyncComponent } from 'vue';

export const text = defineAsyncComponent(() => import('../module/text.vue')); // ?

export const code = defineAsyncComponent(() => import('../module/code.vue')); // ?

export const select = defineAsyncComponent(() => import('../module/select.vue')); // ?

export const status = defineAsyncComponent(() => import('../module/status.vue')); // ?

export const number = defineAsyncComponent(() => import('../module/number.vue')); // ?

export const password = defineAsyncComponent(() => import('../module/password.vue')); // ?
