import { BaseModel } from '../Common/Base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Classify extends BaseModel {
  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({ /* 名称 */ length: 50 }) name: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
