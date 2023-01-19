import { IsAlphanumeric, IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SsoAuthCreateDto {
  @IsString()
  @ApiProperty({ description: '账号/邮箱' })
  user: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  pass: string;

  @IsString()
  @IsAlphanumeric()
  @ApiProperty({ description: '验证码' })
  code: string;
}

export class SsoAuthLoginDto extends SsoAuthCreateDto {}

export enum AuthSendCodeType {
  email, // 邮箱
  phone, // 手机
}

export class SsoAuthSendCodeDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @IsEnum(AuthSendCodeType)
  @ApiProperty({ description: '状态', enum: AuthSendCodeType })
  state: AuthSendCodeType;
}
