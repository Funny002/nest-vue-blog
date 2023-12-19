import { PaginationRequest } from './src/decorators';

/** 分页响应声明 */
export interface PaginationResponse<T = any> extends PaginationRequest {
  maxPage?: number;
  hasNext: boolean;
  total: number;
  list: T[];
}

/** 分页静态方法 */
export class Pagination {
  /** 响应分页参数补充
   * @param page
   * @param total
   * @param list
   * @param params
   */
  static of<T = any>(page: PaginationRequest, total: number, list: T[], params: { [key: string]: any } = {}): PaginationResponse<T> {
    let pageOrder = {};

    params = params || page.params;

    const { pageSize, pageCount, order } = page;

    const maxPage = pageSize ? Math.floor(total / pageSize) + (total % pageCount ? 1 : 0) : undefined;

    if (order) {
      const orderBy = Object.keys(order)[0];
      pageOrder = { orderBy, orderKey: order[orderBy] };
    }

    return { ...pageOrder, params, pageSize, pageCount, hasNext: pageCount < maxPage, maxPage, total, list };
  }
}

export * from './src/decorators';
