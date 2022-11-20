import { PaginationRequest } from './src/decorators';

/** 分页响应声明 */
export interface PaginationResponse<T = any> extends PaginationRequest {
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
   */
  static of<T = any>(page: PaginationRequest, total: number, list: T[]): PaginationResponse<T> {
    let pageOrder = {};

    const { pageSize, pageCount, order, params } = page;

    const maxPage = Math.floor(total / pageSize) + (total % pageCount ? 1 : 0);

    if (order) {
      const orderBy = Object.keys(order)[0];
      pageOrder = { orderBy, orderKey: order[orderBy] };
    }

    return { ...pageOrder, params, pageSize, pageCount, hasNext: pageCount < maxPage, total, list };
  }
}

export * from './src/decorators';
