import { ConfigGlobal, MysqlConf } from '@config';
import { MysqlModel, Users } from '@mysql';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
//
import { UsersModule } from '../Users/users.module';

@Module({
  imports: [
    // mysql
    MysqlModel.use([Users], { logging: false }),
    // config
    ConfigGlobal.use([MysqlConf]),
    //
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
