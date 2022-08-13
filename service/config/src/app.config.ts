import { registerAs } from '@nestjs/config';

export interface AppSystem {
  port: number;
  prefix: string;
  version: string;
}

export const SSO_NAME = 'app_system';

export const Service_NAME = 'app_service';

export const Sso = registerAs(SSO_NAME, (): AppSystem => ({
  port: 9871,
  prefix: '',
  version: '1',
}));

export const Service = registerAs(Service_NAME, (): AppSystem => ({
  port: 9771,
  prefix: '',
  version: '1',
}));
