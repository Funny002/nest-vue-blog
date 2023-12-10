import { createHash } from 'crypto';

export function createPass(user: string, pass: string) {
  const userHash = createHash('sha256').update(user).digest('hex');
  const passHash = createHash('sha256').update(pass).digest('hex');
  return createHash('md5').update(userHash + passHash).digest('hex');
}
