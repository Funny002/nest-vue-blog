import Axios from './utils/Axios';

const baseUrl = window.__CONFIG__.baseApi + '/auth/';

export const ApiLogin = (tags: string, user: string, pass: string) => Axios.post(baseUrl + 'login', { user, pass, tags });

export const ApiHasToken = (tags: string, token: string) => Axios.get(baseUrl + 'hasToken', { params: { token, tags } });

export const ApiLogout = () => Axios.post(baseUrl + 'logout');