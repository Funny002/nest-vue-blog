import Axios from './utils/Axios';

export const ApiLogin = (tags: string, user: string, pass: string) => Axios.post(window.__CONFIG__.baseApi + '/auth/login', { user, pass, tags });
