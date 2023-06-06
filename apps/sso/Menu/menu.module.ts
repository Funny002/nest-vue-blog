import { RedisModule } from '@app/common/redis';
import { MenuController } from './menu.controller';
import { MysqlModel } from '@app/common/mysql';
import { MenuService } from './menu.service';
import { Module } from '@nestjs/common';
import { Menu } from '@app/mysql';

@Module({
  imports: [
    // redis
    RedisModule,
    // mysql
    MysqlModel.feature(Menu),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
