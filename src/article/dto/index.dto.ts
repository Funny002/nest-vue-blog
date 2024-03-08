import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { ArticleComment, ArticleState } from '@mysql';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleListDto {
  @ApiProperty({ description: '标题' })
  title: string;

  @ApiProperty({ description: '内容' })
  content: string;

  @ApiProperty({ description: '标签' })
  tags: string[];

  @ApiProperty({ description: '文件' })
  files: string[];

  @ApiProperty({ description: '状态' })
  state: ArticleState;

  @ApiProperty({ description: '创建时间' })
  createTime: string;

  @ApiProperty({ description: '更新时间' })
  updateTime: string;
}

export class ArticleCreateDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  @ApiProperty({ description: '标题' })
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  @IsString({ message: '内容必须是字符串' })
  @ApiProperty({ description: '内容' })
  content: string;

  @IsArray({ message: '文件不能为空' })
  @IsString({ each: true, message: '文件必须是字符串' })
  @ApiProperty({ description: '文件', type: 'Array<String>' })
  files: string[];

  @IsArray({ message: '标签必须是数组' })
  @IsString({ each: true, message: '标签必须是字符串' })
  @ApiProperty({ description: '标签', type: 'Array<String>' })
  tags: string[];

  @IsArray({ message: '分类必须是数组' })
  @IsString({ each: true, message: '分类必须是字符串' })
  @ApiProperty({ description: '分类', type: 'Array<String>' })
  types: string[];

  @IsArray({ message: '附件必须是数组' })
  @IsString({ each: true, message: '附件必须是字符串' })
  @ApiProperty({ description: '附件', type: 'Array<String>' })
  attachment: string[];

  @Min(0)
  @IsInt({ message: '评论截止时间必须是数字' })
  @ApiProperty({ description: '评论截止时间' })
  comment_date: number;

  // @IsEnum(ArticleState, { message: '状态不在枚举范围' })
  // @ApiProperty({ description: '状态', enum: ArticleState })
  // state: ArticleState;

  @IsEnum(ArticleComment, { message: '评论状态不在枚举范围' })
  @ApiProperty({ description: '评论状态', enum: ArticleComment })
  comment_state: ArticleComment;
}

export class ArticleDeleteDto {
  @IsArray({ message: 'ids必须是数组' })
  @ArrayNotEmpty({ message: 'ids不能为空' })
  @IsInt({ each: true, message: 'ids必须是数字' })
  @ApiProperty({ description: '附件', type: 'Array<Number>' })
  ids: number[];

  @IsOptional()
  @IsInt({ message: '状态必须是数字' })
  @ApiProperty({ description: '状态' })
  isAll: number;
}

export class ArticleUpdateDto extends IntersectionType(
  ArticleDeleteDto, PartialType(ArticleCreateDto),
) {}
