import { BaseModel } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';

export enum ArticleState {
  pass, // 通过
  draft, // 草稿
  not_pass, // 未通过
  archive, // 归档
  remove, // 删除
}

@Entity({ engine: 'MyISAM' })
export class Articles extends BaseModel {
  @Column({ /* 标题 */ }) title: string;

  @Column({ /* 作者id */ }) suer_id: number;

  @Column({ /* 作者名称 */ }) user_name: string;

  @Column({ /* 作者头像 */ }) user_avatar: string;

  @Column({ /* 点赞 */ default: 0 }) star: number;

  @Column({ /* 阅读 */ default: 0 }) read: number;

  @Column({ /* 评论 */ default: 0 }) comment: number;

  @Column({ /* 内容 */ type: 'text' }) content: string;

  @Column({ /* 标签 */ type: 'simple-array' }) tags: string[];

  @Column({ /* 分类 */ type: 'simple-array' }) types: string[];

  @Column({ /* 状态 */ type: 'enum', enum: ArticleState, default: ArticleState.draft }) state: ArticleState;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
