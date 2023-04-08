import { BaseModel } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';

export enum SettingState {
  disable, // 禁用
  enable, // 启用
}

@Entity()
export class Setting extends BaseModel {
  @Column({ comment: '标签', length: 50 }) tags: string;

  @Column({ comment: '分类', length: 50 }) type: string;

  @Column({ comment: '标识', length: 100 }) keys: string;

  @Column({ comment: '标题', length: 100 }) title: string;

  @Column({ comment: '内容', type: 'text' }) value: string;

  @Column({ comment: '备注', type: 'text' }) note: string;

  @Column({ comment: '状态', type: 'enum', enum: SettingState, default: SettingState.disable }) state: SettingState;
}
