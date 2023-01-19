import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Mysql_NAME } from '@app/config';

export class MysqlModel {
  static use(...entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const conf = config.get<TypeOrmModuleOptions>(Mysql_NAME);
        return Object.assign({ ...conf }, { entities });
      },
    });
  }

  static feature(...args: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(args);
  }
}
