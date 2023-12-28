import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlName } from '@config';

//
import { Users } from './User/Users.entity';
import { Files } from './File/Files.entity';
import { Setting } from './Setting/Setting.entity';
import { UsersConf } from './User/UsersConf.entity';
import { FilesFolder } from './File/FilesFolder.entity';
import { UsersNameRecord } from './User/UsersNameRecord.entity';

export class MysqlModel {
  static use(entities?: any[], options: { [key: string]: any } = {}) {
    entities = entities || [
      Users,
      UsersConf,
      UsersNameRecord,
      Files,
      FilesFolder,
      Setting,
    ];
    //
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get<TypeOrmModuleOptions>(MysqlName);
        return Object.assign({ ...conf }, { ...options }, { entities });
      },
    });
  }

  static feature(...args: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(args);
  }
}

// User
export * from './User/Users.entity';
export * from './User/UsersConf.entity';
export * from './User/UsersNameRecord.entity';

// File
export * from './File/Files.entity';
export * from './File/FilesFolder.entity';

// Setting
export * from './Setting/Setting.entity';
