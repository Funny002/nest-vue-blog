import { BaseModel, BaseState } from '@app/mysql/common';
import { Column, Entity, ILike, Index, Like } from 'typeorm';

@Entity()
@Index('unique', ['uid', 'name', 'email'], { unique: true })
export class Users extends BaseModel {
  @Column({ /* uid */ }) uid: number;

  @Column({ /* 昵称 */ length: 50 }) name: string;

  @Column({ /* 密码 */ length: 64 }) pass: string;

  @Column({ /* 邮箱 */ length: 100 }) email: string;

  @Column({ /* 头像 */ nullable: true }) avatar: string;

  @Column({ /* 用户链接 */ length: 200, nullable: true }) href: string;

  @Column({ /* 个性说明 */ length: 250, nullable: true }) explain: string;

  @Column({ /* 登录时间 */ type: 'datetime', nullable: true }) login_time: Date;

  @Column({ /* 权限 */ type: 'simple-array', nullable: true }) rower: string[];

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  @Column({ /* 锁定时间 */ default: '' }) lock_time: string;

  @Column({ /* 锁定次数 */ type: 'tinyint', default: 0 }) lock_count: number;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      uid: { name: 'uid' },
      name: { name: 'name', handle: Like },
      email: { name: 'email', handle: ILike },
    };
  }
}
