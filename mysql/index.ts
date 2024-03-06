import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlName } from '@config';

//
import { Users, UsersConf, UsersNameRecord } from './User';
import { Files, FilesFolder } from './File';
import { Setting } from './Setting';

export class MysqlModel {
  static use(entities?: any[], options: { [key: string]: any } = {}) {
    entities = (entities || []).concat([Users, UsersConf, UsersNameRecord, Files, FilesFolder, Setting]);
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

export * from './User';
export * from './File';
export * from './Setting';
export * from './Articles';
