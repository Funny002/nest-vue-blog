import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** 默认分页配置声明 */
interface DefaultPagination {
  minLimit: number;
  maxLimit: number;
  defaultOrderKey: 'DESC' | 'ASC';
}

/** 管道 ~ 获取分页参数 */
export const PaginationParams = createParamDecorator((data: Partial<DefaultPagination> = {}, input: ExecutionContext) => {
  let {
    query: { pageCount, pageSize, orderBy, orderKey, ...params },
  } = input.switchToHttp().getRequest();

  const { minLimit, maxLimit, defaultOrderKey } = Object.assign({
    minLimit: 10,
    maxLimit: 100,
    defaultOrderKey: 'DESC',
  }, data);

  const order = orderBy ? { [orderBy]: ['DESC', 'ASC'].includes(orderKey) ? orderKey : defaultOrderKey } : {};

  pageSize = Math.min(Math.max(minLimit, +pageSize), maxLimit);

  pageCount = +pageCount < 1 ? 1 : +pageCount;

  return Object.assign({ pageCount, pageSize, order, params });
});
