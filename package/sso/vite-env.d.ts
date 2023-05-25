/// <reference types="vite/client" />
export {};

declare global {
  interface __CONFIG__ {
    tags?: string;
    port?: string;
    host?: string;
    origin?: string;
    baseApi?: string;
  }

  interface Window {
    __CONFIG__: __CONFIG__;
  }
}
