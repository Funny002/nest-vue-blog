// 权限
import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModel } from '@app/mysql';

export enum PowerState {
  disable,
  enable,
}

export enum PowerType {
  URL,
  Operate,
  Group,
}

@Entity()
@Tree('closure-table')
@Index('index', ['type', 'name', 'mutex'])
@Index('unique', ['keys'], { unique: true })
export class Power extends BaseModel {
  @Column({ comment: '分类', enum: PowerType }) type: PowerType;
  
  @TreeParent() parent: Power;
  
  @TreeChildren() children: Power[];
  
  @Column({ comment: '标识' }) keys: string;
  
  @Column({ comment: '名称' }) name: string;
  
  @Column({ comment: '互斥', nullable: true }) mutex: string;
  
  @Column({ type: 'enum', comment: '状态', enum: PowerState, default: PowerState.enable }) state: PowerState;
}
