/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module 'vue' {
//   // 用于增强组件实例类型以支持自定义全局属性
//   interface ComponentCustomProperties {
//   }
// }