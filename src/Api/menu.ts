import Axios from './utils/Axios';

const baseUrl = window.__CONFIG__.baseApi + '/menu/';

export interface MenuItem {
  id: number;
  keys: string;
  tags: string;
  name: string;
  types: string;
  state: number;
  values: string;
  create_time: string;
  update_time: string;
  mutex: null | string[],
}

interface MenuData {

}

interface MenuParams {
  parent: number;
  tags: string;
  name: string;
  keys: string;
  values: string;
  types: MenuTypes;
  state: BaseState;
}

export const ApiMenuPost = (data: MenuData) => Axios.post<PageParams<MenuItem[]>>(baseUrl, data);

export const ApiMenuInfo = (id: number) => Axios.get<AxiosResponse<MenuItem>>(baseUrl + 'info/' + id);

export const ApiMenuSave = (id: number, data: MenuData) => Axios.put<PageParams<MenuItem[]>>(baseUrl + id, data);

export const ApiMenuList = (params?: Partial<MenuParams>) => Axios.get<PageParams<MenuItem[]>>(baseUrl + 'list', { params });

export const ApiMenuTree = (params: BaseTree, id?: number) => Axios.get<PageParams<MenuItem[]>>(baseUrl + 'tree/' + id, { params });
