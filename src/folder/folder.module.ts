import { Files, FilesFolder, MysqlModel } from '@mysql';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Files, FilesFolder),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
