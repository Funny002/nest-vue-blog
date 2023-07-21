import { Column, Entity, ILike, Index, Like, ManyToOne } from 'typeorm';
import { BaseModel, BaseState } from '@app/mysql/common';

@Entity()
@Index('unique', ['uid'], { unique: true })
export class UserConf extends BaseModel {
  @Column({ /* uid */ }) uid: number;

  @Column({ /* 登录配置 */ type: 'text' }) authConf: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
