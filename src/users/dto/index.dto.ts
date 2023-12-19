import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UsersSaveDto {
  @IsOptional()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @Length(4, 16, { message: '用户名长度必须在4-16之间' })
  @ApiPropertyOptional({ description: '用户名', example: 'admin' })
  name?: string;
}

export class UsersPageDto {
  @IsOptional()
  @IsNotEmpty({ message: '页码不能为空' })
  @IsString({ message: '页码必须是字符串' })
  @ApiPropertyOptional({ description: '页码', example: '1' })
  page?: string;
}