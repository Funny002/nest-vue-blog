import { Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseModel, Power, User } from '@app/mysql';

@Entity()
export class PowerExtend extends BaseModel {
  // 主键绑定
  @OneToOne(type => User, user => user.id) uid: User;
  
  // 扩展
  @OneToMany(type => Power, time => time.keys) undock: Power;
  
  // 移除
  @OneToMany(type => Power, time => time.keys) extend: Power;
}
