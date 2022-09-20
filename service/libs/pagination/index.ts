export * from './src/decorators';

/** 分页声明 */
export interface PaginationOptions {
  pageSize: number;
  pageCount: number;
}

/** 分页响应声明 */
export interface PaginationResponse<T = any> extends PaginationOptions {
  hasNext: boolean;
  total: number;
  list: T[];
}

/** 分页静态方法 */
export class Pagination {
  /** 响应分页参数补充
   * @param PaginationRequest
   * @param total
   * @param list
   */
  of<T = any>({ pageSize, pageCount }: PaginationOptions, total: number, list: T[]): PaginationResponse<T> {
    const maxPage = Math.floor(total / pageSize) + (total % pageCount ? 1 : 0);
    
    return { pageSize, pageCount, hasNext: pageCount < maxPage, total, list };
  }
}
