import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilesListDto {
  @IsOptional()
  @IsString({ message: '文件夹必须是字符' })
  @ApiProperty({ description: '文件夹', required: false })
  folder?: string;
}

export class FilesPreviewDto {
  @IsOptional()
  @IsString({ message: '质量必须是字符' })
  @ApiProperty({ description: '质量', required: false })
  quality?: string;

  @IsOptional()
  @IsString({ message: '宽必须是字符' })
  @ApiProperty({ description: '宽', required: false })
  width?: string;

  @IsOptional()
  @IsString({ message: '高必须是字符' })
  @ApiProperty({ description: '高', required: false })
  height?: string;
}
