import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { Users } from '@app/mysql';

@Entity()
export class FileCite extends BaseModel {
  @ManyToOne(() => Users, user => user.id) referrer_id: Users;

  @Column({ comment: '内容', length: 200 }) content: string;
}
