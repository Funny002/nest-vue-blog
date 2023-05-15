import { ArrayUnique, IsAlphanumeric, IsArray, IsDivisibleBy, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseState } from '@app/mysql';

/** 权限创建声明 */
export class SsoPowerCreateDto {
  // @IsEnum(PowerType)
  // @ApiProperty({ description: '分类' })
  // type: PowerType;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '名称' })
  name: string;

  @IsArray()
  @ArrayUnique()
  @ApiProperty({ description: '互斥', required: false }) mutex: string[];

  @IsEnum(BaseState)
  @ApiProperty({ type: 'enum', description: '状态' })
  state: BaseState;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级', required: false })
  parent: number;
}

/** 权限修改声明 */
export class SsoPowerSaveDto extends SsoPowerCreateDto {
}

/** 获取树 */
export class SsoPowerTreeDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({ description: '标识' })
  keys: string;

  @IsNumberString()
  @ApiProperty({ description: '深度', required: false })
  depth: string;
}
