import { Column, Entity } from 'typeorm';
import { BaseModel } from '../Common';

@Entity()
export class UsersNameRecord extends BaseModel {
  @Column({ /* uid */ length: 100 }) uid: string;

  @Column({ /* 昵称 */ length: 50 }) name: string;

  @Column({ /* 上一个昵称 */ length: 50 }) lest_name: string;

  @Column({ /* 消息 */ type: 'text', nullable: true }) message: string;

  @Column({ /* 是否用户操作 */ type: 'tinyint', default: 0, width: 1 }) is_user: number;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
