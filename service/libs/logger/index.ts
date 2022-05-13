import { ConsoleLogger } from '@nestjs/common';

export class Logger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, arguments);
  }

  log(message: any, context?: string) {
    super.log.apply(this, arguments);
  }

  httpLog(port: number) {
    super.log(`http://127.0.0.1:${port}`, 'HttpLog');
    super.log(`http://127.0.0.1:${port}/api-doc`, 'HttpLog');
  }
}
