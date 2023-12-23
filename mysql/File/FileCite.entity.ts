import { BaseModel } from '../Common/Base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Users } from '../User/Users.entity';

@Entity()
export class FileCite extends BaseModel {
  @ManyToOne(() => Users, user => user.id) referrer_id: Users;

  @Column({ /* 内容 */ length: 200 }) content: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
