import { Column, Entity, ILike, Index, Like } from 'typeorm';
import { BaseModel } from '../Common/Base.entity';

export enum UserState {
  LOCK = 'lock', // 锁定
  CHECK = 'check', // 审核/检查
  ENABLE = 'enable', // 启用
  DELETE = 'delete', // 删除
  DISABLE = 'disable', // 禁用
}

export enum UserRole {
  ADMIN = 'admin', // 管理员
  USER = 'user', // 普通用户
}

@Entity()
@Index('unique', ['uid', 'name', 'email'], { unique: true })
export class Users extends BaseModel {
  @Column({ /* uid */ length: 100 }) uid: string;

  @Column({ /* 昵称 */ length: 50 }) name: string;

  @Column({ /* 账号 */ length: 50 }) user: string;

  @Column({ /* 密码 */ length: 64 }) pass: string;

  @Column({ /* 邮箱 */ length: 100 }) email: string;

  @Column({ /* 头像 */ nullable: true }) avatar: string;

  @Column({ /* 角色 */ type: 'enum', enum: UserRole, default: UserRole.USER }) role: string | UserRole;

  @Column({ /* 状态 */ type: 'enum', enum: UserState, default: UserState.DISABLE }) state: string | UserState;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      uid: { name: 'uid' },
      name: { name: 'name', handle: Like },
      email: { name: 'email', handle: ILike },
    };
  }
}
