/** 权限创造Dto声明 */
import { ArrayMinSize, IsDivisibleBy, IsNotEmpty, IsNumberString, IsOptional, Min, Validate } from 'class-validator';
import { PowerState, PowerType } from '@app/mysql';
import { ApiProperty } from '@nestjs/swagger';

/** 权限创建声明 */
export class SsoPowerCreateDto {
  @Min(0)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '分类' })
  type: PowerType;
  
  @IsNotEmpty()
  @ApiProperty({ description: '标识' })
  keys: string;
  
  @IsNotEmpty()
  @ApiProperty({ description: '名称' })
  name: string;
  
  @ArrayMinSize(0)
  @ApiProperty({ description: '互斥', required: false }) mutex: string[];
  
  @Min(0)
  @IsDivisibleBy(1)
  @ApiProperty({ type: 'enum', description: '状态' })
  state: PowerState;
  
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级' })
  parent: number;
}

/** 权限修改声明 */
export class SsoPowerSaveDto extends SsoPowerCreateDto {
}

export class SsoPowerTreeDto {
  @IsNotEmpty()
  @ApiProperty({ description: '标识' })
  keys: string;
  
  @IsNumberString()
  @ApiProperty({ description: '深度' })
  depth: string;
}
