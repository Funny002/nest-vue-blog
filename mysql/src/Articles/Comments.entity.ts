import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModel } from '@app/mysql/common';

export enum CommentsState {
  pass, // 通过
  not_pass, // 未通过
  remove, // 删除
}

@Entity()
@Tree('closure-table')
export class Comments extends BaseModel {
  
  @TreeParent() parent: Comments;
  
  @TreeChildren() children: Comments[];
  
  @Column({ comment: '文章id' }) article_id: number;
  
  @Column({ comment: '评论内容' }) content: number;
  
  @Column({ comment: '用户名称' }) user_name: number;
  
  @Column({ comment: '用户链接' }) user_href: number;
  
  @Column({ comment: '用户邮箱' }) user_email: number;
  
  @Column({ comment: '用户uid', default: 0 }) user_uid: number;
  
  @Column({ comment: '状态', type: 'enum', enum: CommentsState, default: CommentsState.not_pass }) state: CommentsState;
}
