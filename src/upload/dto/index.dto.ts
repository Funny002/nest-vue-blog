import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDto {
  @IsOptional()
  @IsString({ message: '文件夹必须是字符串' })
  @ApiProperty({ description: '文件夹', required: false })
  folder?: string;
}

export class UploadFileDto extends UploadDto {
  @ApiProperty({ description: '文件', type: 'File' })
  file: any;
}

export class UploadFilesDto extends UploadDto {
  @ApiProperty({ description: '多个文件', type: 'Array<File>' })
  files: Array<any>;
}

export class UploadAvatarDto {
  @ApiProperty({ description: '文件', type: 'File' })
  file: any;
}
