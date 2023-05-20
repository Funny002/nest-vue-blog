import { SsoSettingCreateDto } from '@app/dto/sso.setting.dto';
import { BaseModel, BaseState } from '@app/mysql/common';
import { Column, Entity, Like } from 'typeorm';

export enum SettingPower {
  Other = 'other',
  Public = 'public',
  System = 'system',
  Permissions = 'permissions'
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

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Enable }) state: BaseState;

  @Column({ /* 权限 */ type: 'enum', enum: SettingPower, default: SettingPower.Other }) power: SettingPower;

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

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      tage: { name: 'tags' },
      type: { name: 'type' },
      title: { name: 'title', handle: Like },
    };
  }
}
