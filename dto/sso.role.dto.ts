import { ArrayUnique, IsAlphanumeric, IsArray, IsDivisibleBy, IsEnum, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Min } from 'class-validator';
import { SsoPowerTreeDto } from '@app/dto/sso.power.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BaseState } from '@app/mysql';

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
  
  @IsArray()
  @ArrayUnique()
  @ApiProperty({ description: '添加' })
  undock: string[];
  
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '说明', required: false })
  note: string;
  
  @IsNumber()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '数量', required: false })
  count: number;
  
  @IsArray()
  @ArrayUnique()
  @ApiProperty({ description: '角色互斥', required: false })
  mutex: string[];
  
  @IsEnum(BaseState)
  @ApiProperty({ enum: BaseState, description: '状态' })
  state: BaseState;
  
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级', required: false })
  parent: number;
}

/** 获取树 */
export class SsoRoleTreeDto extends SsoPowerTreeDto {}
