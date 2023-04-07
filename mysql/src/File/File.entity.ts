import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { Users } from '@app/mysql';

export enum FileTypes {
  Cloud, // 云盘
  Cache, // 缓存
  Mongo, // MongoDB
}

export enum FileFormat {
  Other, // 其他
  Image, // 图片
  Zip, // 压缩包
  Word, // 文档
  Video, // 视频
  Audio, // 音频
}

@Entity()
export class Files extends BaseModel {
  @ManyToOne(() => Users, user => user.id) uid: Users;

  @Column({ comment: '分类' }) tags: string;

  @Column({ comment: '上级id' }) parent_id: number;

  @Column({ comment: '文件名', length: 200 }) name: string;

  @Column({ comment: '内容', length: 200 }) content: string;

  @Column({ type: 'enum', enum: FileTypes, comment: '类型' }) types: FileTypes;

  @Column({ type: 'enum', enum: FileFormat, comment: '格式', default: FileFormat.Other }) format: FileFormat;

  @Column({ type: 'tinyint', comment: '临时文件', default: 0 }) is_temp: number;

  @Column({ type: 'tinyint', comment: '文件夹', default: 0 }) is_folder: number;
}
