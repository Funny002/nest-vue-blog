import { HttpException, HttpStatus } from '@nestjs/common';
import { UserState } from '@mysql';

/* 手动抛出一个前端可响应异常 {code, message}  */
export function ManualHttpException(message: string, code = 1) {
  throw new HttpException({ message, code }, HttpStatus.OK);
}

/* 根据用户状态抛出异常 */
export class UsersException {
  constructor(state: UserState) {
    switch (state) {
      case UserState.DISABLE:
        ManualHttpException('用户已被禁用');
      case UserState.LOCK:
        ManualHttpException('用户已被锁定');
      case UserState.CHECK:
        ManualHttpException('用户正在审核');
      case UserState.DELETE:
        ManualHttpException('用户已被删除');
    }
  }
}
