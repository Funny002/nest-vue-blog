export const RedisInject = '__Redis_Inject__';
export const RedisOptions = '__Redis_Options__';


export interface RedisModuleOptions {
  db?: number;
  name?: string;
  host?: string;
  url?: string;
  port?: number;
  username?: string;
  password?: string;
  maxRetry?: number;
  retryTimes?: number;
}
