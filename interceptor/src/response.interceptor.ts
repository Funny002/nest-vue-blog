import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

//
export class ResponseDto {
  data?: any;
  code: number;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto> | Promise<Observable<ResponseDto>> {
    return next.handle().pipe(map((context): ResponseDto => {
      return { code: 0, data: context };
    }));
  }
}
