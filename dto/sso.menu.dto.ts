import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
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
