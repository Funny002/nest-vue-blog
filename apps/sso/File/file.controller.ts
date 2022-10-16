import { FileDownloadDto, FileOperationDto, FilePrepareDto, FileShardUploadDto, FileUploadFileDto } from '@app/dto/file.dto';
import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { noAuth } from '@app/common/jwtAuth';

@ApiTags('File 文件管理')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: '上传文件' })
  @ApiBody({ type: FileUploadFileDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async UploadFile(@UploadedFile() file: Express.Multer.File) {
    // 上传一个文件
  }

  @Post('prepare')
  @ApiOperation({ summary: '预上传文件分片' })
  async PrepareFile(@Body() body: FilePrepareDto) {
    // 预上传分片请求
  }

  @Post('shardUpload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传文件分片' })
  @UseInterceptors(FileInterceptor('file'))
  async ShardUpload(@Body() boyd: FileShardUploadDto, @UploadedFile() file: Express.Multer.File) {
    // 上传分片文件 === File/[用户]/[预上传id]/[FileName]
  }

  @Post('createFile')
  @ApiOperation({ summary: '从分片创建文件' })
  async CreateFile() {
    // 从分片创建文件
  }

  @Put('operation')
  @ApiOperation({ summary: '操作(修改|删除|移动)' })
  async OperationFile(@Body() body: FileOperationDto) {
    // 操作 - 修改 - 删除 - 移动
  }

  @noAuth()
  @Get('download')
  @ApiOperation({ summary: '下载文件' })
  async DownloadFile(@Query() query: FileDownloadDto) {
    // 令牌 ~ 下载文件
  }
}
