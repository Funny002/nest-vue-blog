import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MysqlModel } from '@app/common/mysql';
import { Menu } from '@app/mysql';
import { RedisModule } from '@app/common/redis';

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
