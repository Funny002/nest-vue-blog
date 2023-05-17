import { BaseModel, BaseState } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';
import { SsoSettingCreateDto } from '@app/dto/sso.setting.dto';

export enum SettingPower {
  Other = 'other',
  Public = 'public',
  System = 'system',
  Permissions = 'permissions'
}

@Entity()
export class Setting extends BaseModel {
  @Column({ comment: '标签', length: 50 }) tags: string;

  @Column({ comment: '分类', length: 50 }) type: string;

  @Column({ comment: '标识', length: 100 }) keys: string;

  @Column({ comment: '标题', length: 100 }) title: string;

  @Column({ comment: '权限', nullable: true }) power_id: number;

  @Column({ comment: '备注', type: 'text', nullable: true }) note: string;

  @Column({ comment: '内容', type: 'text', nullable: true }) value: string;

  @Column({ comment: '状态', type: 'enum', enum: BaseState, default: BaseState.Enable }) state: BaseState;

  @Column({ comment: '权限', type: 'enum', enum: SettingPower, default: SettingPower.Other }) power: SettingPower;

  static of_create(body: SsoSettingCreateDto) {
    const target = new Setting();
    target.tags = body.tags;
    target.type = body.type;
    target.keys = body.keys;
    target.note = body.note;
    target.title = body.title;
    target.value = body.value;
    target.state = body.state;
    target.power = body.power;
    target.power_id = body.power_id;
    return target;
  }
}
