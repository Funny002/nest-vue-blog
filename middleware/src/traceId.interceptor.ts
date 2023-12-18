import { Request } from 'express';
import * as uuid from 'uuid';

/* 拦截&验证 TraceId */
export function useTraceIdInterceptor(traceId = 'TraceId') {
  return (req: Request, _: any, next: Function) => {
    const TraceId = (req.header(traceId) || req.headers[traceId]) as string;
    if (!TraceId || typeof TraceId !== 'string' || !uuid.validate(TraceId)) {
      req.headers[traceId] = uuid.v4();
    }
    next();
  };
}
