import { BaseModel } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';

export enum ArticleComment {
  on, // 开启
  off, // 关闭
  where // 限时
}

@Entity()
export class ArticlesExtend extends BaseModel {
  @Column({ comment: '文件', type: 'simple-array' }) files: string[];

  @Column({ comment: '附件', type: 'simple-array' }) attachment: string[];

  @Column({ comment: '评论时间', type: 'datetime', default: null }) comment_date: Date;

  @Column({ comment: '评论状态', type: 'enum', enum: ArticleComment, default: ArticleComment.off }) comment_state: ArticleComment;
}
