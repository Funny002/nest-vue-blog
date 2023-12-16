import { MysqlModel, Setting, Users } from '@mysql';
import { ConfigGlobal, MysqlConf } from '@config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
//
import { UsersModule } from '../Users/users.module';
import { EmailModule } from '../Email/email.module';

@Module({
  imports: [
    // mysql
    MysqlModel.use([Users, Setting], { logging: false }),
    // config
    ConfigGlobal.use([MysqlConf]),
    //
    UsersModule,
    EmailModule,
  ],
  providers: [AppService],
})
export class AppModule {}
