import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { SettingPower, SettingState } from '@mysql';
import { ApiProperty } from '@nestjs/swagger';

export class SettingCreateDto {
  @IsString({ message: '分类不正确' })
  @ApiProperty({ description: '分类' })
  type: string;

  @IsString({ message: '标识不正确' })
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsString({ message: '名称不正确' })
  @ApiProperty({ description: '名称' })
  title: string;

  @IsString({ message: '内容不正确' })
  @ApiProperty({ description: '内容', required: false })
  value: string;

  @IsOptional()
  @IsString({ message: '备注不正确' })
  @ApiProperty({ description: '备注', required: false })
  note?: string;

  @IsOptional()
  @IsEnum(SettingState, { message: '状态不正确' })
  @ApiProperty({ description: '状态', required: false, enum: SettingState })
  state?: SettingState;

  @IsOptional()
  @IsEnum(SettingPower, { message: '权限不正确' })
  @ApiProperty({ description: '状态', required: false, enum: SettingPower })
  power?: SettingPower;
}

export class SettingUpdateDto extends PartialType(SettingCreateDto) {}

export class SettingStateDto extends PickType(SettingUpdateDto, ['state'] as const) {}

export class SettingDeleteDto {
  @IsNumber(undefined, { each: true, message: 'ids不正确' })
  @ApiProperty({ description: 'id数组' })
  ids: number[];
}
