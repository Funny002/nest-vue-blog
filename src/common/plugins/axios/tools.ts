import { AxiosInstance } from 'axios';

export type AxiosToolsType = 'request' | 'response';

export type AxiosToolsOptions<T = any> = (args: T) => T | Promise<T>;

export interface AxiosToolsConf {
  axios: AxiosInstance;
  types: 'request' | 'response';
  onRejected: (args: any) => (Promise<any> | any);
  onFulfilled: (args: any) => (Promise<any> | any);
}

export class AxiosTools {
  state: number | undefined;
  private readonly config: AxiosToolsConf;

  constructor(axios: AxiosInstance, types: AxiosToolsType, onFulfilled: AxiosToolsOptions, onRejected: AxiosToolsOptions) {
    this.config = { axios, types, onFulfilled, onRejected };
    this.use();
  }

  use() {
    const { axios, types, onFulfilled, onRejected } = this.config;
    if (this.state !== undefined) this.eject();
    this.state = axios.interceptors[types].use(onFulfilled, onRejected);
  }

  eject() {
    const { axios, types } = this.config;
    if (this.state !== undefined) {
      axios.interceptors[types].eject(this.state);
    }
  }

  neglect(func: () => void): void {
    this.eject();
    func();
    this.use();
  }

  async neglectSync<T = any>(func: () => Promise<T>): Promise<T> {
    this.eject();
    const target = await func();
    this.use();
    return target;
  }
}

export interface AxiosToolsConfig {
  __retry_max: number; // 重试最大数
  __retry_time: number; // 重试延迟
  __retry_count: number; // 重试次数
}
