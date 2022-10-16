import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { User } from '@app/mysql';

@Entity()
export class UserOauth extends BaseModel {
  @ManyToOne(type => User, user => user.id) uid: User;
  
  @Column({ comment: '分类' }) type: string;
  
  @Column({ comment: '令牌' }) token: string;
  
  @Column({ type: 'datetime', comment: '超时时间', nullable: true }) exceed: Date;
}
