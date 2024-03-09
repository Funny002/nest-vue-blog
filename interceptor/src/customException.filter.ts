import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { getClientIp } from 'request-ip';
import { dateFormat } from '@utils/date';
import { Request } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message || exception.getResponse()['message'] || exception.getResponse();
    }

    response.status(status).json({
      msg: message,
      code: status,
      path: request.url,
      method: request.method,
      time: dateFormat('Y-M-D H:I:S t'),
      ip: getClientIp(request).replace('::ffff:', ''),
    });
  }
}
