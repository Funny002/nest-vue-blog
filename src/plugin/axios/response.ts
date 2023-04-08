import { AxiosToolsConfig, AxiosToolsOptions } from './tools';
import { AxiosResponse } from 'axios';

type ResponseConfig = AxiosToolsConfig & AxiosResponse;

export function onResponseFulfilled(config: AxiosToolsOptions) {
  return config;
}

export function onResponseRejected(error: AxiosToolsOptions<ResponseConfig>) {
  return Promise.reject(error);
}
