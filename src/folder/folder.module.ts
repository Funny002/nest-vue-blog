import { Files, FilesFolder, MysqlModel, Users } from '@mysql';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Users, Files, FilesFolder),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
