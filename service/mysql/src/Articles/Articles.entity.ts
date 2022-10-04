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
  @Column({ comment: '标题' }) title: string;
  
  @Column({ comment: '作者id' }) suer_id: number;
  
  @Column({ comment: '作者名称' }) user_name: string;
  
  @Column({ comment: '作者头像' }) user_avatar: string;
  
  @Column({ comment: '点赞', default: 0 }) star: number;
  
  @Column({ comment: '阅读', default: 0 }) read: number;
  
  @Column({ comment: '评论', default: 0 }) comment: number;
  
  @Column({ comment: '内容', type: 'text' }) content: string;
  
  @Column({ comment: '标签', type: 'simple-array' }) tags: string[];
  
  @Column({ comment: '分类', type: 'simple-array' }) types: string[];
  
  @Column({ comment: '状态', type: 'enum', enum: ArticleState, default: ArticleState.draft }) state: ArticleState;
}
