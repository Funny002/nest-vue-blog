// 权限
import { Column, Entity } from 'typeorm';
import { BaseModel } from '@app/mysql';

export enum PowerState {
  enable,
  disable
}

@Entity()
export class Power extends BaseModel {
  @Column({ comment: '分类' }) type: string;
  
  @Column({ comment: '标识' }) keys: string;
  
  @Column({ comment: '名称' }) name: string;
  
  @Column({ comment: '互斥', nullable: true }) mutex: string;
  
  @Column({ type: 'enum', comment: '状态', enum: PowerState, default: PowerState.enable }) state: PowerState;
}
