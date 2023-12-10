import { BaseModel } from '../Common/Base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
@Index('unique', ['uid'], { unique: true })
export class UserConf extends BaseModel {
  @Column({ /* uid */ }) uid: number;

  @Column({ /* 登录配置 */ type: 'text' }) authConf: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
