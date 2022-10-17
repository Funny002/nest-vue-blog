import { AES } from 'crypto-js';

export class Aes {
  // 用 JSON.stringify 实现兼容
  static encrypt(key: string, value: any) {
    return AES.encrypt(JSON.stringify({ value }), key).toString();
  }

  static decrypt(key: string, value: any) {
    return (AES.decrypt(value, key).toString(CryptoJS.enc.Utf8) as { value?: any }).value;
  }
}
