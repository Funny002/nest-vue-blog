import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export enum ResponseCodeMap {
  Ok, // 成功
  Error, // 失败
  Warning, // 警告
}

export class ResponseDto {
  [key: string]: any;

  data?: any;
  msg?: string | {
    title?: string; // 标题
    content: string; // 内容
    duration?: number; // 延迟
    drive: 'Notification' | 'Message'; // 驱动
    type: 'error' | 'success' | 'warning' | 'info'; // 类型
  };
  code?: ResponseCodeMap;
}

const configArr = ['data', 'msg', 'code'];

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto> | Promise<Observable<ResponseDto>> {
    return next.handle().pipe(map((context): ResponseDto => {
      const responseData: ResponseDto = { code: context.code || ResponseCodeMap.Ok };
      configArr.forEach((key: string): void => {
        if (context[key] !== undefined) {
          responseData[key] = context[key];
        }
      });
      return responseData;
    }));
  }
}
