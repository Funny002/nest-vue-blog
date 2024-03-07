import { Column, Entity, In } from 'typeorm';
import { BaseModel } from '../Common';

export enum ArticleState {
  PASS = 'pass',  // 通过
  DRAFT = 'draft',  // 草稿
  NOT_PASS = 'not_pass',  // 未通过
  ARCHIVE = 'archive',  // 归档
  REMOVE = 'remove',  // 删除
}

export enum ArticleComment {
  on, // 开启
  off, // 关闭
  where // 限时
}

@Entity({ engine: 'MyISAM' })
export class Articles extends BaseModel {
  @Column({ /* 标题 */ }) title: string;

  @Column({ /* 作者id */ }) uid: number;

  @Column({ /* 作者名称 */ }) name: string;

  @Column({ /* 作者头像 */ }) avatar: string;

  @Column({ /* 点赞 */ default: 0 }) star: number;

  @Column({ /* 阅读 */ default: 0 }) read: number;

  @Column({ /* 评论 */ default: 0 }) comment: number;

  @Column({ /* 内容 */ type: 'text' }) content: string;

  @Column({ /* 文件 */ type: 'simple-array' }) files: string[];

  @Column({ /* 标签 */ type: 'simple-array' }) tags: string[];

  @Column({ /* 分类 */ type: 'simple-array' }) types: string[];

  @Column({ /* 附件 */ type: 'simple-array' }) attachment: string[];

  @Column({ /* 评论时间 */ type: 'datetime', default: null }) comment_date: Date;

  @Column({ /* 状态 */ type: 'enum', enum: ArticleState, default: ArticleState.DRAFT }) state: ArticleState;

  @Column({ /* 评论状态 */ type: 'enum', enum: ArticleComment, default: ArticleComment.off }) comment_state: ArticleComment;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      id: { name: 'id' },
      uid: { name: 'uid' },
      state: { name: 'state', handle: In },
    };
  }
}
