import { onResponseFulfilled, onResponseRejected } from './response';
import { onRequestFulfilled, onRequestRejected } from './request';
import { AxiosTools } from './tools';
import axios from 'axios';

const Axios = axios.create({
  method: 'GET',
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// 请求拦截器
export const axiosRequest = new AxiosTools(Axios, 'request', onRequestFulfilled, onRequestRejected);

// 响应拦截器
export const axiosResponse = new AxiosTools(Axios, 'response', onResponseFulfilled, onResponseRejected);

export default Axios;
