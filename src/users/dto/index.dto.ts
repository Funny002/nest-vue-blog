import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserState } from '@mysql';

export class UsersCreateDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @Length(4, 16, { message: '用户名长度必须在4-16之间' })
  @ApiPropertyOptional({ description: '用户名' })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @Length(6, 30, { message: '密码长度必须在6-30之间' })
  @ApiPropertyOptional({ description: '密码' })
  pass: string;

  @IsEmail(undefined, { message: '邮箱格式不正确' })
  @IsString({ message: '邮箱必须是字符串' })
  @ApiPropertyOptional({ description: '邮箱' })
  email: string;


  @IsOptional()
  @IsString({ message: '邮箱必须是字符串' })
  @ApiPropertyOptional({ description: '头像', required: false })
  avatar?: string;

  @IsEnum(UserRole)
  @IsString({ message: '角色必须是字符串' })
  @ApiPropertyOptional({ description: '角色' })
  role: UserRole;

  @IsOptional()
  @IsEnum(UserState)
  @IsString({ message: '状态必须是字符串' })
  @ApiPropertyOptional({ description: '状态' })
  state: UserState;
}

export class UsersSaveDto {
  @IsOptional()
  @IsString({ message: '用户名必须是字符串' })
  @Length(4, 16, { message: '用户名长度必须在4-16之间' })
  @ApiPropertyOptional({ description: '用户名' })
  name?: string;

  @IsOptional()
  @IsString({ message: '头像必须是字符串' })
  @ApiPropertyOptional({ description: '头像' })
  avatar?: string;
}

export class UsersPageDto {
  @IsOptional()
  @IsNotEmpty({ message: '页码不能为空' })
  @IsString({ message: '页码必须是字符串' })
  @ApiPropertyOptional({ description: '页码' })
  page?: string;
}

export class UsersDelDto {
  @IsNotEmpty({ message: '不能为空' })
  @IsArray({ message: '必须是字符串数组' })
  @ApiPropertyOptional({ description: 'uid 数组' })
  ids: string[];

  @IsOptional()
  @IsBoolean({ message: '必须是布尔类型' })
  @ApiPropertyOptional({ description: '是否软删除' })
  isDelete?: boolean;
}
