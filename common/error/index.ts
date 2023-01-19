import { HttpException, HttpStatus } from '@nestjs/common';
import { UserState } from '@app/mysql';

/** 手动抛出一个前端可响应异常 {code, message}  */
export class ManualException extends HttpException {
  constructor(message: string, code = 1) {
    super({ message, code }, HttpStatus.OK);
  }
}

export class UserException extends ManualException {
  constructor(state: UserState) {
    switch (state) {
      case UserState.check: super('账号正在审核中'); break;
      case UserState.disable: super('账号已被禁用'); break;
      case UserState.freeze: super('账号在在冻结中'); break;
      default: super('账号被系统锁定'); break;
    }
  }
}
