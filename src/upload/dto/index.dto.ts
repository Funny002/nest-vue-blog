import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ description: '文件', type: 'File' })
  file: any;

  @ApiProperty({ description: '多个文件', type: 'Array<File>' })
  files: Array<any>;

  @IsOptional()
  @IsString({ message: '文件夹必须是字符串' })
  @ApiProperty({ description: '文件夹', required: false })
  folder?: string;
}
