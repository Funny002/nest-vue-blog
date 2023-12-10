import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlName } from '@config';

//
import { Users } from './User/User.entity';
import { UserConf } from './User/UserConf.entity';

export class MysqlModel {
  static use() {
    const entities = [Users, UserConf];
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
export * from './User/UserConf.entity';
//
// // Power
// export * from './src/Power/Menu.entity';
// export * from './src/Power/Role.entity';
// export * from './src/Power/Power.entity';
//
// // File
// // export * from './src/File/File.entity';
// // export * from './src/File/FileCite.entity';
//
// // Articles
// // export * from './src/Articles/Tags.entity';
// // export * from './src/Articles/Classify.entity';
// // export * from './src/Articles/Articles.entity';
// // export * from './src/Articles/ArticlesExtend.entity';
// // export * from './src/Articles/Comments.entity';
//
// // Setting
// export * from './src/Setting.entity';
