import { BaseModel } from '../Common/Base.entity';
import { Column, Entity } from 'typeorm';

export enum FileFormat {
  Other = 'other', // 其他
  Image = 'image', // 图片
  Zip = 'zip', // 压缩包
  Word = 'word', // 文档
  Video = 'video', // 视频
  Audio = 'audio', // 音频
}

@Entity()
export class Files extends BaseModel {
  @Column({ /* uid */ }) uid: string;

  @Column({ /* 扩展名 */ }) ext: string;

  @Column({ /* 上级id */ default: 0 }) pid: number;

  @Column({ /* 文件名 */ length: 100 }) name: string;

  @Column({ /* 类型 */ length: 100 }) mimetype: string;

  @Column({ /* 原文件名 */ length: 100 }) original_name: string;

  @Column({ /* 大小 */ type: 'int', default: 0 }) size: number;

  @Column({ /* 分类 */ length: 50, nullable: true }) tags: string;

  @Column({ /* 格式 */ type: 'enum', enum: FileFormat }) format: string | FileFormat;

  @Column({ /* 宽 */  nullable: true }) width: number;

  @Column({ /* 高 */  nullable: true }) height: number;

  @Column({ /* 备注 */ length: 200, default: '' }) remark: string;

  @Column({ /* md5 */ }) hash: string;

  @Column({ /* 相对路径 */ }) path: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
