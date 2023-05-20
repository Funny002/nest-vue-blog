import { IsAlphanumeric, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* 注册 */
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

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '标签', required: false })
  tags: string;
}

/* 登录 */
export class SsoAuthLoginDto extends SsoAuthCreateDto {
}

/* 分类 */
export enum AuthSendCodeType {
  email, // 邮箱
  phone, // 手机
}

/* 发送验证码 */
export class SsoAuthSendCodeDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: '邮箱' })
  email: string;

  @IsEnum(AuthSendCodeType)
  @ApiProperty({ description: '状态', enum: AuthSendCodeType })
  state: AuthSendCodeType;
}
