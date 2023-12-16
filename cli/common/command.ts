import 'reflect-metadata';

/* 声明 */
export interface CommandOption {
  name: string;
  version?: string;
  description?: string;
}

/* 声明 */
export interface CommandOptions {
  flags: string;
  default?: any;
  alias?: string;
  values?: string;
  isCommand?: boolean;
  description?: string;

  handler?(...args: any[]): any;

  command?(...args: any[]): void | Promise<void>;
}

/* 名称 */
export const CommandName = '_Command_Name_';

/* 名称 */
export const CommandOptionsName = '_Command_Options_Name_';

/* 装饰器 */
export function Command(options: CommandOption) {
  return function (constructor: any) {
    Reflect.defineMetadata(CommandName, options, constructor);
    return constructor;
  };
}

/* 装饰器 */
export function CommandOptions(options: CommandOptions[]) {
  return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(CommandOptionsName, options, descriptor.value);
    return descriptor;
  };
}

export * from './utils/handler';
