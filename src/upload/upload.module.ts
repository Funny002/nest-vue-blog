import { Files, FilesFolder, MysqlModel, Users } from '@mysql';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MulterModule.register(),
    MysqlModel.feature(Users, Files, FilesFolder),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
