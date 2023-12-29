import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

/* 创建文件夹 */
export class FolderCreateDto {
  @IsOptional()
  @IsNumber(undefined, { message: '父级必须是数字' })
  @ApiProperty({ description: '父级', required: false })
  parent?: number;

  @IsString({ message: '名称必须是字符串' })
  @ApiProperty({ description: '名称' })
  name: string;

  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  @ApiProperty({ description: '描述', required: false })
  description?: string;

  @IsOptional()
  @IsNumber(undefined, { message: '排序必须是数字' })
  @ApiProperty({ description: '排序', required: false })
  sort?: number;

  @IsOptional()
  @IsString({ message: '图标必须是字符串' })
  @ApiProperty({ description: '图标', required: false })
  icon?: string;
}

/* 删除文件夹 */
export class FolderDeleteDto {
  @IsNumber(undefined, { message: 'id必须是数字' })
  @ApiProperty({ description: 'id' })
  id: number;

  @IsOptional()
  @IsBoolean({ message: '是否删除内容必须是布尔值' })
  @ApiProperty({ description: '是否删除内容', required: false })
  deleteContent?: boolean;

  @IsOptional()
  @IsBoolean({ message: '是否删除子级必须是布尔值' })
  @ApiProperty({ description: '是否删除子级', required: false })
  deleteChild?: boolean;
}

/* 文件夹分组 */
export class FolderGroupDto {
  @IsOptional()
  @IsString({ message: 'uid 必须是字符串' })
  @ApiProperty({ description: '用户 uid', required: false })
  uid?: string;
}
