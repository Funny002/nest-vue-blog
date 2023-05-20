import { ArrayUnique, IsAlphanumeric, IsArray, IsDivisibleBy, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseState } from '@app/mysql';
import { SsoMenuTreeDto } from '@app/dto/sso.menu.dto';

/** 创建 */
export class SsoPowerCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '标签' })
  tags: string;

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
  @IsOptional()
  @ArrayUnique()
  @ApiProperty({ description: '互斥', required: false })
  mutex: string[];

  @IsEnum(BaseState)
  @ApiProperty({ type: 'enum', description: '状态' })
  state: BaseState;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级', required: false })
  parent: number;

  @IsArray()
  @IsOptional()
  @ArrayUnique()
  @ApiProperty({ description: '内容', required: false })
  values: string[];
}

/** 树 */
export class SsoPowerTreeDto extends SsoMenuTreeDto {}
