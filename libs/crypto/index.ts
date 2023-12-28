import { BinaryLike, createHash } from 'crypto';

/* md5 */
export function md5(value: BinaryLike) {
  return createHash('md5').update(value).digest('hex');
}

/* sha256 */
export function sha256(value: BinaryLike) {
  return createHash('sha256').update(value).digest('hex');
}

/* sha512 */
export function sha512(value: BinaryLike) {
  return createHash('sha512').update(value).digest('hex');
}

/* sha1 */
export function sha1(value: BinaryLike) {
  return createHash('sha1').update(value).digest('hex');
}

/* 创建密码 */
export function createPass(user: string, pass: string) {
  return md5(sha256(user) + sha256(pass));
}
