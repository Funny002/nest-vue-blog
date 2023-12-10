import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlName } from '@config';

//
import { Users } from './User/User.entity';
import { Setting } from './Setting/Setting.entity';
import { UsersConf } from './User/UsersConf.entity';

export class MysqlModel {
  static use() {
    const entities = [
      Users,
      UsersConf,
      Setting,
    ];
    //
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get<TypeOrmModuleOptions>(MysqlName);
        return Object.assign({ ...conf }, { entities });
      },
    });
  }

  static feature(...args: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(args);
  }
}

// User
export * from './User/User.entity';
export * from './User/UsersConf.entity';

// Setting
export * from './Setting/Setting.entity';
