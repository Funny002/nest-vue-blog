import { Body, Controller, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadAvatarDto, UploadFileDto, UploadFilesDto } from './dto/index.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualHttpException } from '@libs/error';
import { UploadService } from './upload.service';
import { Files, Users } from '@mysql';

@Controller('upload')
@ApiTags('upload 上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @ApiOperation({ summary: '文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data; utf-8')
  async upload(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() body: UploadFileDto, isAvatar = false) {
    const uid = req['user'].uid;
    const folder = parseInt(body.folder || '0');
    //
    const [isFolder, FolderError] = await this.uploadService.verifyFolder(uid, folder);
    if (!isFolder && FolderError) return ManualHttpException(FolderError);
    //
    const info = await Files.getInfoKeys({ uid, pid: folder, tags: isAvatar ? 'avatar' : 'files', hash: this.uploadService.getHash(file.buffer) });
    if (info) return this.uploadService.handlerFileInfo(info);
    //
    const fileInfo = await this.uploadService.createFile(uid, file, isAvatar);
    if (!fileInfo) return ManualHttpException('文件上传失败');
    //
    if (isAvatar && (fileInfo.width !== fileInfo.height || fileInfo.height > 300)) {
      this.uploadService.removeFile(fileInfo.path);
      return ManualHttpException('头像尺寸不符合要求');
    }
    fileInfo.pid = folder;
    return this.uploadService.handlerFileInfo(await Files.save(fileInfo));
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data; utf-8')
  async avatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File, @Body() _: UploadAvatarDto) {
    const info = await this.upload(req, file, { file }, true);
    try {
      await Users.update({ uid: req['user'].uid }, { avatar: info['id'] });
      return '头像上传成功';
    } catch (e) {
      return ManualHttpException('头像上传失败');
    }
  }

  @Post('multiple')
  @ApiOperation({ summary: '多文件上传' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data; utf-8')
  async multiple(@Req() req: Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body() body: UploadFilesDto) {
    const uid = req['user'].uid;
    const folder = parseInt(body.folder || '0');
    const [isFolder, FolderError] = await this.uploadService.verifyFolder(uid, folder);
    if (!isFolder && FolderError) return ManualHttpException(FolderError);
    const target: any[] = [];
    const target_save: Files[] = [];
    for (const file of files) {
      const info = await Files.getInfoKeys({ uid, pid: folder, tags: 'files', hash: this.uploadService.getHash(file.buffer) });
      if (info) {
        target.push(this.uploadService.handlerFileInfo(info));
        continue;
      }
      const fileInfo = await this.uploadService.createFile(uid, file, false);
      if (!fileInfo) return ManualHttpException('文件上传失败');
      target_save.push(fileInfo);
      fileInfo.pid = folder;
    }
    for (const file of target_save) {
      target.push(this.uploadService.handlerFileInfo(await Files.save(file)));
    }
    return target;
  }
}
