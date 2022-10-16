import { registerAs } from '@nestjs/config';

export const Captcha_Name = 'svg-captcha';

export const Captcha = registerAs(Captcha_Name, () => ({}));
