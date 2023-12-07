import { BaseConfig } from '@utils';

declare global {
  interface MenuItem {
    icon?: string;
    label: string;
    router: string;
    children?: MenuItem[];
  }

  interface NavItem {
    icon?: any,
    name: string;
    label: string;
    hasClose?: boolean;
  }

  // enum MenuTypes {
  //   Router = 'router', // 路由
  //   Button = 'button', // 按钮
  //   Redirect = 'redirect', // 重定向
  //   Resource = 'resource', // 资源
  //   Operation = 'operation', // 操作
  // }
  //
  // enum BaseState {
  //   Check = -2, // 审核/检查
  //   Freeze = -1, // 冻结
  //   Disable = 0, // 禁用
  //   Enable = 1, // 启用
  //   Delete = 2, // 删除
  //   Lock = 4, // 锁定
  // }
  //
  // interface BaseTree {
  //   deep: number;
  //   tree: boolean;
  // }
  //
  // interface AxiosResponse<T> {
  //   message: string;
  //   code: number;
  //   data: T;
  // }
  //
  // type PageParams<T, P = any> = AxiosResponse<{
  //   orderBy: string;
  //   orderKey: 'DESC' | 'ASC'
  //   params: P,
  //   pageSize: number,
  //   pageCount: number,
  //   hasNext: boolean
  //   maxPage: number;
  //   total: number
  //   list: T[]
  // }>
  //
  // interface __CONFIG__ {
  //   host: string; // 主机
  //   port?: string; // 端口
  //   title: string; // 标题
  //   baseApi: string; // 基础 api
  //   titleSuffix?: string; // 后缀
  // }
  //
  interface Window {
    __CONFIG__: BaseConfig;
  }
}

export {};
