import { ArrayUnique, IsAlphanumeric, IsArray, IsDivisibleBy, IsEnum, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PowerState } from '@app/mysql';
import { SsoPowerTreeDto } from '@app/dto/sso.power.dto';

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
  
  @IsEnum(PowerState)
  @ApiProperty({ enum: PowerState, description: '状态' })
  state: PowerState;
  
  @IsOptional()
  @Min(1)
  @IsDivisibleBy(1)
  @ApiProperty({ description: '父级', required: false })
  parent: number;
}

/** 修改 */
export class SsoRoleSaveDto extends SsoRoleCreateDto {}

/** 获取树 */
export class SsoRoleTreeDto extends SsoPowerTreeDto {}
