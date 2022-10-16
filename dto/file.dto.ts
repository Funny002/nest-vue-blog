import { ApiProperty } from '@nestjs/swagger';

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

export class FileUploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary', description: '单个文件' }) file: any;
}
