import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 登录
export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @ApiProperty({ description: '账号/邮箱' })
  user: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @Length(6, 20, { message: '密码长度必须在6-20之间' })
  @ApiProperty({ description: '密码' })
  pass: string;
}

// 注册
export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串' })
  @Length(5, 5, { message: '验证码长度必须是5位' })
  @ApiProperty({ description: '验证码' })
  code: string;
}

// 验证码
export class CodeDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({ description: '邮箱' })
  email: string;
}
