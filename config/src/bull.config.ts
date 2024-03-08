import { BullModuleOptions } from '@nestjs/bull/dist/interfaces/bull-module-options.interface';
import { registerAs } from '@nestjs/config';

export const BullName = 'bull-queue';

export const BullConf = registerAs(BullName, (): BullModuleOptions => {
  return {
    prefix: 'bull',
    // 自动删除成功的任务
    defaultJobOptions: {
      removeOnComplete: true,
      backoff: {
        delay: 1000,
        type: 'fixed',
      },
    },
    settings: { maxStalledCount: 3 },
    redis: { host: '127.0.0.1', port: 6379, db: 2, name: 'Queue' },
  };
});
