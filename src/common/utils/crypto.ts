import Utf8 from 'crypto-js/enc-utf8';
import { AES } from 'crypto-js';

export class Aes {
  // 用 JSON.stringify 实现兼容
  static encrypt(key: string, value: any) {
    return AES.encrypt(JSON.stringify({ value }), key).toString();
  }

  static decrypt(key: string, value: any) {
    return JSON.parse(AES.decrypt(value, key).toString(Utf8)).value;
  }
}
