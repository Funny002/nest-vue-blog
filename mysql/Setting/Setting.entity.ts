import { BaseModel } from '../Common/Base.entity';
import { Column, Entity, Like } from 'typeorm';

export enum SettingPower {
  Other = 'other', // 其他
  Users = 'users', // 用户
  Public = 'public', // 公共
  System = 'system', // 系统
  Permissions = 'permissions' // 权限
}

export enum SettingState {
  Disable = 0, // 禁用
  Enable = 1, // 启用
  Delete = 2, // 删除
}

@Entity()
export class Setting extends BaseModel {
  @Column({ /* 标签 */ length: 50 }) tags: string;

  @Column({ /* 分类 */ length: 50 }) type: string;

  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({ /* 标题 */ length: 100 }) title: string;

  @Column({ /* 权限 */ nullable: true }) power_id: number;

  @Column({ /* 备注 */ type: 'text', nullable: true }) note: string;

  @Column({ /* 内容 */ type: 'text', nullable: true }) value: string;

  @Column({ /* 状态 */ type: 'enum', enum: SettingState, default: SettingState.Enable }) state: SettingState;

  @Column({ /* 权限 */ type: 'enum', enum: SettingPower, default: SettingPower.Other }) power: SettingPower;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      tage: { name: 'tags' },
      type: { name: 'type' },
      title: { name: 'title', handle: Like },
    };
  }
}
