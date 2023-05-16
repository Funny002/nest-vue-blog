import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseState, MenuTypes } from '@app/mysql';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @ApiProperty({ description: '内容' })
  values: string;

  @IsEnum(MenuTypes)
  @ApiProperty({ enum: MenuTypes, description: '分类' })
  types: MenuTypes;

  @IsEnum(BaseState)
  @ApiProperty({ enum: BaseState, description: '状态' })
  state: BaseState;
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

  @IsOptional()
  @IsEnum(BaseState)
  @ApiProperty({ enum: BaseState, description: '状态', required: false })
  state: BaseState;
}

enum MenuTreeEnum {
  false,
  true,
}

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
