import { HttpException, HttpStatus } from '@nestjs/common';

/** 手动抛出一个前端可响应异常 {code, message}  */
export class ManualException extends HttpException {
  constructor(message: string, code = 1) {
    super({ message, code }, HttpStatus.OK);
  }
}
