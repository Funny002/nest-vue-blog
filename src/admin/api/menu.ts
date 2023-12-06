import Axios from '@api';

const baseUrl = window.__CONFIG__.baseApi + '/menu/';

export interface MenuItem {
  id: number;
  keys: string;
  tags: string;
  name: string;
  types: string;
  sort: number;
  icon: string;
  state: number;
  values: string;
  router?: string;
  create_time: string;
  update_time: string;
  children?: MenuItem[];
  mutex: null | string[];
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

export const ApiMenuSaveState = (id: number, state: number) => Axios.put<PageParams<MenuItem[]>>(baseUrl + 'state/' + id, { state });

export const ApiMenuList = (params?: Partial<MenuParams>) => Axios.get<AxiosResponse<MenuItem[]>>(baseUrl + 'list', { params });

export const ApiMenuTree = (params: BaseTree, id?: number) => Axios.get<PageParams<MenuItem[]>>(baseUrl + 'tree/' + id, { params });

export const ApiMenuRemove = (...ids: number[]) => Axios.delete<AxiosResponse<number>>(baseUrl, { data: { ids } });

export const ApiMenuRouter = () => Axios.get<AxiosResponse<MenuItem[]>>(baseUrl + 'router');

export const ApiMenuOptions = () => Axios.get<AxiosResponse<MenuItem[]>>(baseUrl + 'options');
