import { BaseModel } from '../Common/Base.entity';
import { Column, Entity } from 'typeorm';

export enum ArticleComment {
  on, // 开启
  off, // 关闭
  where // 限时
}

@Entity()
export class ArticlesExtend extends BaseModel {
  @Column({ /* 文件 */ type: 'simple-array' }) files: string[];

  @Column({ /* 附件 */ type: 'simple-array' }) attachment: string[];

  @Column({ /* 评论时间 */ type: 'datetime', default: null }) comment_date: Date;

  @Column({ /* 评论状态 */ type: 'enum', enum: ArticleComment, default: ArticleComment.off }) comment_state: ArticleComment;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
