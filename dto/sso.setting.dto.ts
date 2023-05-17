import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { BaseState, MenuTypes, SettingPower } from '@app/mysql';
import { ApiProperty } from '@nestjs/swagger';

export class SsoSettingCreateDto {
  @IsString()
  @ApiProperty({ description: '标签' })
  tags: string;

  @IsString()
  @ApiProperty({ description: '分类' })
  type: string;

  @IsString()
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsString()
  @ApiProperty({ description: '标题' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '内容', required: false })
  value: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '权限ID', required: false })
  power_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '备注', required: false })
  note: string;

  @IsOptional()
  @IsEnum(BaseState)
  @ApiProperty({ enum: BaseState, description: '状态', required: false })
  state: BaseState;

  @IsOptional()
  @IsEnum(SettingPower)
  @ApiProperty({ enum: SettingPower, description: '权限', required: false })
  power: SettingPower;
}

export class SsoSettingPageDto {
  @IsString()
  @ApiProperty({ description: '标签' })
  tags: string;

  @IsString()
  @ApiProperty({ description: '分类' })
  type: string;

  @IsString()
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsString()
  @ApiProperty({ description: '标题' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '内容', required: false })
  value: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '权限ID', required: false })
  power_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '备注', required: false })
  note: string;

  @IsOptional()
  @IsEnum(BaseState)
  @ApiProperty({ enum: BaseState, description: '状态', required: false })
  state: BaseState;

  @IsOptional()
  @IsEnum(SettingPower)
  @ApiProperty({ enum: SettingPower, description: '权限', required: false })
  power: SettingPower;
}
