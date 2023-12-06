import Axios from '@api';

const baseUrl = window.__CONFIG__.baseApi + '/users/';

interface UsersParams {

}

export const ApiUsersList = (params?: Partial<UsersParams>) => Axios.get(baseUrl + 'list', { params });
