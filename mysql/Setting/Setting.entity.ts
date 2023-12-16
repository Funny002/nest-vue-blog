import { Column, Entity, Index, Like, Unique } from 'typeorm';
import { BaseModel } from '../Common/Base.entity';

export enum SettingPower {
  Other = 'other', // 其他
  Users = 'users', // 用户
  Public = 'public', // 公共
  System = 'system', // 系统
  Permissions = 'permissions' // 权限
}

export enum SettingState {
  Disable = 'disable', // 禁用
  Enable = 'enable', // 启用
  Delete = 'delete', // 删除
}

@Entity()
@Unique('Unique', ['type'])
@Index('Index', ['tags', 'keys', 'state', 'power'])
export class Setting extends BaseModel {
  @Column({ /* 标签 */ length: 50 }) tags: string;

  @Column({ /* 分类 */ length: 50 }) type: string;

  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({ /* 标题 */ length: 100 }) title: string;

  @Column({ /* 备注 */ type: 'text', nullable: true }) note: string;

  @Column({ /* 内容 */ type: 'text', nullable: true }) value: string;

  @Column({ /* 状态 */ type: 'enum', enum: SettingState, default: SettingState.Enable }) state: string | SettingState;

  @Column({ /* 权限 */ type: 'enum', enum: SettingPower, default: SettingPower.Other }) power: string | SettingPower;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
