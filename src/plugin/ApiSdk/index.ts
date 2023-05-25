import { Axios, AxiosRequest } from '@api/utils/Axios';
import { App } from 'vue';

export class AppSDK {
  private readonly __axios: Axios;
  private __token: string | null;

  constructor(token?: string) {
    this.__axios = new Axios(this.handleRequest.bind(this));
    this.__token = token || null;
  }

  get axios() {
    return this.__axios;
  }

  get token(): string {
    return this.__token || '';
  }

  set token(value: string) {
    this.__token = value;
  }

  async handleRequest(config: AxiosRequest) {
    console.log(config);
    return config;
  }
}

export default {
  install(app: App<Element>) {
    app.config.globalProperties.$api = new AppSDK();
  },
};
