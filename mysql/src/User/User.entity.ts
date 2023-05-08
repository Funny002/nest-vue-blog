import { BaseModel, BaseState } from '@app/mysql/common';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('unique', ['uid', 'name', 'email'])
export class Users extends BaseModel {
  @Column({ comment: 'uid' }) uid: string;

  @Column({ comment: '昵称', length: 50 }) name: string;

  @Column({ comment: '密码', length: 64 }) pass: string;

  @Column({ comment: '邮箱', length: 100 }) email: string;

  @Column({ comment: '头像', nullable: true }) avatar: string;

  @Column({ comment: '用户链接', length: 200, nullable: true }) href: string;

  @Column({ comment: '个性说明', length: 250, nullable: true }) explain: string;

  @Column({ comment: '登录时间', type: 'datetime', nullable: true }) login_time: Date;

  @Column({ comment: '权限', type: 'simple-array', nullable: true }) rower: string[];

  @Column({ comment: '状态', type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  @Column({ comment: '锁定时间', default: '' }) lock_time: string;

  @Column({ comment: '锁定次数', type: 'tinyint', default: 0 }) lock_count: number;
}
