export * from './src/decorators';

interface PaginationRequest {
  pageSize: number;
  pageCount: number;
}

interface PaginationResponse<T = any> extends PaginationRequest {
  hasNext: boolean;
  total: number;
  list: T[];
}

export class Pagination {
  /**
   * @param PaginationRequest {PaginationRequest}
   * @param list {any[]}
   */
  of<T = any>({ pageSize, pageCount }: PaginationRequest, total: number, list: T[]): PaginationResponse<T> {
    const maxPage = Math.floor(total / pageSize) + (total % pageCount ? 1 : 0);

    return { pageSize, pageCount, hasNext: pageCount < maxPage, total, list };
  }
}
