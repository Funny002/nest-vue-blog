import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Files, MysqlModel } from '@mysql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Files),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
