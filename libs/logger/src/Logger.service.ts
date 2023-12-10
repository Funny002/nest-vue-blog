import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

// import { createLogger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  public log(message: any, context?: string) {
    super.log(message, context);
  }

  public warn(message: any, context?: string) {
    super.warn(message, context);
  }

  public error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
  }
}
