import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** 默认分页配置声明 */
export interface DefaultPagination {
  minLimit: number;
  maxLimit: number;
  defaultValue: boolean;
  defaultOrderKey: 'DESC' | 'ASC';
}

/** 分页 声明 */
export interface PaginationRequest<T = any> {
  order?: { [key: string]: 'DESC' | 'ASC' };
  pageCount?: number;
  pageSize?: number;
  pageSkip?: number;
  params?: T;
}

/** 管道 ~ 获取分页参数 */
export const PaginationParams = createParamDecorator((data: Partial<DefaultPagination> = {}, input: ExecutionContext): PaginationRequest => {
  let {
    // eslint-disable-next-line prefer-const
    query: { pageCount, pageSize, orderBy, orderKey, ...params },
  } = input.switchToHttp().getRequest();

  const { minLimit, maxLimit, defaultValue, defaultOrderKey } = Object.assign({ minLimit: 10, maxLimit: 100, defaultValue: true, defaultOrderKey: 'DESC' }, data);

  if (defaultValue) {
    pageCount = pageCount || 1;
    pageSize = pageSize || minLimit;
    orderBy = orderBy || 'create_time';
  }

  const order = orderBy ? { [orderBy]: ['DESC', 'ASC'].includes(orderKey) ? orderKey : defaultOrderKey } : undefined;

  pageSize = pageSize ? Math.min(Math.max(minLimit, +pageSize), maxLimit) : undefined;

  pageCount = pageCount ? +pageCount < 1 ? 1 : +pageCount : undefined;

  const pageSkip = pageCount ? (pageCount - 1) * (pageSize || 0) : undefined;

  return { pageCount, pageSize, order, params, pageSkip };
});
