import { BaseModel } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';

export enum UserState {
  enable, // 启用
  disable, // 禁用
  freeze, // 冻结
  check, // 审核
  lock, // 锁定
}

@Entity()
export class User extends BaseModel {
  @Column({ comment: 'uid' }) uid: string;

  @Column({ comment: '昵称', length: 50 }) name: string;

  @Column({ comment: '密码', length: 64 }) pass: string;

  @Column({ comment: '邮箱', length: 100 }) email: string;

  @Column({ comment: '头像', default: null }) avatar: string;

  @Column({ comment: '用户链接', length: 200, default: null }) href: string;

  @Column({ comment: '个性说明', length: 250, default: null }) explain: string;

  @Column({ comment: '登录时间', type: 'datetime', default: null }) login_time: Date;

  @Column({ comment: '权限', type: 'simple-array', default: null }) rower: string[];

  @Column({ comment: '状态', type: 'enum', enum: UserState, default: UserState.disable }) state: UserState;

  @Column({ comment: '锁定时间', default: '' }) lock_time: string;

  @Column({ comment: '锁定次数', type: 'tinyint', default: 0 }) lock_count: number;
}
