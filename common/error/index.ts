import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseState } from '@app/mysql';

/** 手动抛出一个前端可响应异常 {code, message}  */
export function ManualException(message: string, code = 1) {
  throw new HttpException({ message, code }, HttpStatus.OK);
}

const BaseStateMap = {
  [BaseState.Check]: '账号正在审核',
  [BaseState.Freeze]: '账号已冻结',
  [BaseState.Disable]: '账号已禁用',
  // [BaseState.Delete]: '账号已注销',
  [BaseState.Lock]: '账号已锁定',
};

export function UserException(state: BaseState) {
  ManualException(BaseStateMap[state] || '账号被系统锁定');
}

// export class ManualException extends HttpException {
//   constructor(message: string, code = 1) {
//     super({ message, code }, HttpStatus.OK);
//   }
// }

// export class UserException extends ManualException {
//   constructor(state: BaseState) {
//     switch (state) {
//       case BaseState.Check: super('账号正在审核中'); break;
//       case BaseState.Disable: super('账号已被禁用'); break;
//       case BaseState.Freeze: super('账号在在冻结中'); break;
//       default: super('账号被系统锁定'); break;
//     }
//   }
// }