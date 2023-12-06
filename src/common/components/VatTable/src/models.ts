import { defineAsyncComponent } from 'vue';

export const date = defineAsyncComponent(() => import('../models/date.vue')); // ?
export const tags = defineAsyncComponent(() => import('../models/tags.vue')); // ?
export const index = defineAsyncComponent(() => import('../models/index.vue')); // ?
export const status = defineAsyncComponent(() => import('../models/status.vue')); // ?
export const button = defineAsyncComponent(() => import('../models/button.vue')); // ?
