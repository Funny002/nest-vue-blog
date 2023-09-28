import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MenuTypes } from '@app/mysql';

/* 创建 */
export class SsoMenuCreateDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '父级', required: false })
  parent: number;

  @IsString()
  @ApiProperty({ description: '标签' })
  tags: string;

  @IsString()
  @ApiProperty({ description: '名称' })
  name: string;

  @IsString()
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsOptional()
  @ApiProperty({ description: '排序', required: false })
  sort: number;

  @IsOptional()
  @ApiProperty({ description: '图标', required: false })
  icon: string;

  @IsString()
  @ApiProperty({ description: '内容' })
  values: string;

  @IsEnum(MenuTypes)
  @ApiProperty({ enum: MenuTypes, description: '分类' })
  types: MenuTypes;

  @IsString()
  @IsEnum(['0', '1'])
  @ApiProperty({ enum: ['0', '1'], description: '状态' })
  state: string;
}

export class SsoMenuPageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '标签', required: false })
  tags: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '名称', required: false })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '标识', required: false })
  keys: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '内容', required: false })
  values: string;

  @IsOptional()
  @IsEnum(MenuTypes)
  @ApiProperty({ enum: MenuTypes, description: '分类', required: false })
  types: MenuTypes;

  @IsString()
  @IsOptional()
  @IsEnum(['0', '1'])
  @ApiProperty({ enum: ['0', '1'], description: '状态' })
  state: string;
}

/* 树 */
export class SsoMenuTreeDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: '深度', required: false })
  deep: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '树', required: false })
  tree: string;
}
