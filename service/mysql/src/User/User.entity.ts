import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel, PowerRole } from '@app/mysql';

export enum UserState {
  enable,
  disable
}

@Entity()
export class User extends BaseModel {
  @Column({ comment: '昵称' }) name: string;
  
  @Column({ comment: '邮箱' }) email: string;
  
  @Column({ comment: '密码' }) pass: string;
  
  @Column({ comment: '手机', nullable: true }) phone: string;
  
  @Column({ comment: '头像', nullable: true }) avatar: string;
  
  // @Column({ comment: '权限' })
  @OneToMany(type => PowerRole, PowerRole => PowerRole.keys) rower: PowerRole;
  
  @Column({ type: 'enum', enum: UserState, default: UserState.disable, comment: '状态' }) state: UserState;
}
