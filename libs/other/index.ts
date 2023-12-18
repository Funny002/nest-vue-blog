import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from 'request-ip';

/* Cookies */
export const Cookies = createParamDecorator((data: string | string[], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!Array.isArray(data)) return data ? request.cookies?.[data] : request.cookies;
  return data.reduce((acc, key) => {
    acc[key] = request.cookies?.[key];
    return acc;
  }, {});
});

/* IpAddress */
export const IpAddress = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const ip = getClientIp(ctx.switchToHttp().getRequest());
  return ip.replace('::ffff:', '');
});
