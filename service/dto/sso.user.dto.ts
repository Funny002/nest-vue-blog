import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SsoUserCreateDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: '邮箱' }) email: string;
  
  @IsString()
  @ApiProperty({ description: '密码' })
  pass: string;
  
  @IsString()
  @IsAlphanumeric()
  @ApiProperty({ description: '验证码' })
  code: string;
}

export class SsoUserLoginDto extends SsoUserCreateDto {}