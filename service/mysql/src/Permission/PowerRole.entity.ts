import { BaseModel, Power, PowerState } from '@app/mysql';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class PowerRole extends BaseModel {
  @Column({ comment: '标识' }) keys: string;
  
  @Column({ comment: '昵称' }) name: string;
  
  @Column({ comment: '分层', default: 0 }) layered: number;
  
  @Column({ comment: '说明', nullable: true }) note: string;
  
  @Column({ comment: '数量', nullable: true }) count: number;
  
  @Column({ comment: '互斥', nullable: true }) mutex: string;
  
  @Column({ comment: '继承', nullable: true }) inherit: string;
  
  // 扩展
  @OneToMany(type => Power, item => item.keys) undock: Power;
  
  // 移除
  @OneToMany(type => Power, item => item.keys) extend: Power;
  
  @Column({ type: 'enum', comment: '状态', enum: PowerState, default: PowerState.enable }) state: PowerState;
}
