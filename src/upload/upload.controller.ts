import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/index.dto';

@Controller('upload')
@ApiTags('upload 上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: '文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data; utf-8')
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFileDto) {
    const info = this.uploadService.createInfo(file);
    const fileName = info.name + info.ext;
    return { info, fileName };
  }

  // @Post('avatar')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  // async avatar(@UploadedFile() file: Express.Multer.File, @Body() body: { file: Express.Multer.File }) {
  // }

  @Post('uploads')
  @ApiOperation({ summary: '多文件上传' })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data; utf-8')
  async uploads(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: UploadFileDto) {
  }
}
