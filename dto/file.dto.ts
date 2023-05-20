import { ApiProperty } from '@nestjs/swagger';

/* 文件上传 */
export class FileShardUploadDto {
  //
}

export class FilePrepareDto {
  //
}

export class FileOperationDto {
  //
}

export class FileDownloadDto {
  //
}

/* 文件上传 */
export class FileUploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary', description: '单个文件' }) file: any;
}
