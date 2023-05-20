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

  @Column({ /* 分类 */ }) tags: string;

  @Column({ /* 上级id */ }) parent_id: number;

  @Column({ /* 文件名 */ length: 200 }) name: string;

  @Column({ /* 内容 */ length: 200 }) content: string;

  @Column({ /* 临时文件 */ type: 'tinyint', default: 0 }) is_temp: number;

  @Column({ /* 文件夹 */ type: 'tinyint', default: 0 }) is_folder: number;

  @Column({  /* 类型 */ type: 'enum', enum: FileTypes }) types: FileTypes;

  @Column({ /* 格式 */ type: 'enum', enum: FileFormat, default: FileFormat.Other }) format: FileFormat;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      name: { name: 'name' },
    };
  }
}
