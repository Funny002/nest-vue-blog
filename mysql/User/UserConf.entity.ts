import { BaseModel } from '../Common/Base.entity';
import { Column, Entity, ILike, Index, Like } from 'typeorm';

@Entity()
@Index('unique', ['uid'], { unique: true })
export class UserConf extends BaseModel {
  @Column({ /* uid */ }) uid: number;

  @Column({ /* 用户链接 */ length: 200, nullable: true }) href: string;

  @Column({ /* 个性说明 */ length: 250, nullable: true }) explain: string;

  @Column({ /* 登录限制*/ type: 'simple-json', nullable: true }) login_limit: string;

  @Column({ /* 最后登录时间 */ type: 'datetime', nullable: true }) lest_login_time: Date;

  @Column({ /* 锁定时间 */ default: '' }) lock_time: string;

  @Column({ /* 锁定次数 */ type: 'tinyint', default: 0 }) lock_count: number;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
