import { AxiosToolsConfig, AxiosToolsOptions } from './tools';
import { AxiosRequestConfig } from 'axios';

type RequestConfig = AxiosToolsConfig & AxiosRequestConfig;

export function onRequestFulfilled(config: AxiosToolsOptions<RequestConfig>) {
  return config;
}

export function onRequestRejected(error: AxiosToolsOptions) {
  return Promise.reject(error);
}
