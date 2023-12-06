/// <reference types="vite/client" />
import { BaseConfig } from '@utils';

declare global {
  interface Window {
    __CONFIG__: BaseConfig;
  }
}

export {};
