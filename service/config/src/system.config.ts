import { registerAs } from '@nestjs/config';

export interface SystemOptions {
  port: number;
  cookie: string;
  cors: boolean;
  limit: {
    windowMs: number;
    max: number;
  }
}

export const System = registerAs('system', () => ({
  port: 4681,
  cors: true,
  cookie: 'asrtt67y8ujomkjkiuH$%zda',
  limit: {
    windowMs: 30 * 60 * 1000,
    max: 20,
  },
} as SystemOptions));