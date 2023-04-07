import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { Users } from '@app/mysql';

@Entity()
export class UserOauth extends BaseModel {
  @ManyToOne(() => Users, user => user.id) uid: Users;

  @Column({ comment: '提供者', nullable: true }) provider: string;

  @Column({ comment: '提供者id', nullable: true }) provider_id: string;

  @Column({ comment: '令牌', nullable: true }) access_token: string;

  @Column({ comment: '刷新令牌', nullable: true }) refresh_token: string;

  @Column({ type: 'datetime', comment: '超时时间', nullable: true }) expires_time: Date;
}
