import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStorage, setStorage } from './storage';
import { mergeConfig } from './object';

const useTools = <T = AxiosRequestConfig | AxiosResponse>(axios: AxiosInstance, types: 'request' | 'response', onFulfilled: (config: T) => T | Promise<T>, onRejected: (error: any) => any | Promise<any>) => {
  let stateNum: number | null = null;

  const getState = () => stateNum;

  const eject = () => {
    if (stateNum !== null) {
      axios.interceptors[types].eject(stateNum);
    }
  };

  const use = () => {
    if (stateNum !== null) {
      eject();
    }
    // @ts-ignore 类型已限定
    stateNum = axios.interceptors[types].use(onFulfilled, onRejected);
  };

  const neglectSync = async (func: () => Promise<any>): Promise<any> => {
    eject();
    const response = await func();
    use();
    return response;
  };

  const neglect = (func: () => void) => {
    eject();
    func();
    use();
  };

  use();

  return {getState, use, eject, neglect, neglectSync};
};

/** 请求拦截器 */
interface CustomConfig {
  headers: { [key: string]: string };
  __retry_time: number; // 重试延迟
  __retry_count: number; // 重试次数
  __retry_max: number; // 重试最大数
}

export const csrfTokenName = 'csrf-token';

const requestFulfilled = async (config: AxiosRequestConfig & CustomConfig) => {
  mergeConfig(config, {__retry_max: 3, __retry_count: 0, __retry_time: 1000});

  let csrfToken = getStorage(csrfTokenName);

  if (!csrfToken) {
    const {data: res} = await axiosRequest.neglectSync(ApiGetCookie);
    if (res.code === 0) {
      setStorage(csrfTokenName, res.data);
      csrfToken = res.data;
    }
  }

  config.headers[csrfTokenName] = csrfToken;

  const token = getStorage('user-token');

  if (token) config.headers['Authorization'] = 'bearer ' + token;

  return config;
};

const requestRejected = (error: any) => {
  console.log('requestRejected ->>', error);
  return Promise.reject(error);
};

/** 响应拦截器 */
enum StatusCode {
  Unauthorized = 401,
  CsrfToken = 403,
  RequestLimits = 429,
}

const responseFulfilled = (config: AxiosResponse) => {
  console.log('responseFulfilled ->>', config);
  return config;
};

const responseRejected = (error: any) => {
  const {message, response} = error;

  console.log('responseRejected ->>', {message, response});

  const status = response.status;

  if ([4].includes(status)) {
    const {url, __retry_max, __retry_count, __retry_time} = error.config;

    if (__retry_max < __retry_count || isNaN(__retry_count)) return Promise.reject(error);

    error.config.__retry_count = __retry_count + 1;

    return new Promise(resolve => setTimeout(resolve, __retry_time)).then(() => {
      console.log('[%s]\t[retry: %s\s/\s%s]\t href: %s', new Date(), __retry_count, __retry_max, url);

      return axios(error.config);
    });
  }

  return Promise.reject(error);
};

/** 实例 */
export const axios = Axios.create({
  method: 'GET',
  // baseURL: 'http://127.0.0.1:4564',
  timeout: 60 * 1000, // 60/s
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export const ApiGetCookie = () => Axios.get('/baseApi/cookie');

// 请求拦截器
export const axiosRequest = useTools(axios, 'request', requestFulfilled, requestRejected);

// 响应拦截器
export const axiosResponse = useTools(axios, 'response', responseFulfilled, responseRejected);

export default axios;
