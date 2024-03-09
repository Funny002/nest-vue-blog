import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { dateFormat } from '@utils/date';

//
export class ResponseDto {
  data?: any;
  code: number;
  path?: string;
  time?: string;
  method?: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto> | Promise<Observable<ResponseDto>> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(map((context): ResponseDto => {
      return { code: 0, data: context, path: request.url, method: request.method, time: dateFormat('Y-M-D H:I:S t') };
    }));
  }
}
