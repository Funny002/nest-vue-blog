import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { Users } from '@app/mysql';

@Entity()
export class UserOauth extends BaseModel {
  @ManyToOne(() => Users, user => user.id) uid: Users;

  @Column({ comment: '提供者' }) provider: string;

  @Column({ comment: '提供者id' }) provider_id: string;

  @Column({ comment: '令牌' }) access_token: string;

  @Column({ comment: '刷新令牌' }) refresh_token: string;

  @Column({ type: 'datetime', comment: '超时时间', nullable: true }) expires_time: Date;
}