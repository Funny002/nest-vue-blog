import { ArrayNotEmpty, ArrayUnique, IsAlphanumeric, IsArray, IsDivisibleBy, IsNotEmpty, IsOptional, isString, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PowerState } from '@app/mysql';
import { ArrayContains } from 'typeorm';

/** 角色创建声明 */
export class SsoRoleCreateDto {
  
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({ description: '标识' })
  keys: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '昵称' })
  name: string;
  
  @ArrayUnique()
  @ApiProperty({ description: '添加' })
  undock: string[];
  
  @ArrayUnique()
  @ApiProperty({ description: '移除' })
  extend: string[];
  
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '说明', required: false })
  note: string;
  
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '数量', required: false })
  count: number;
  
  @ArrayUnique()
  @ApiProperty({ description: '角色互斥', required: false })
  mutex: string[];
  
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级', required: false })
  parent: number;
  
  @Min(0)
  @IsDivisibleBy(1)
  @ApiProperty({ enum: PowerState, description: '状态' })
  state: PowerState;
}
