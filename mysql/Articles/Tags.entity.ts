import { Column, Entity } from 'typeorm';
import { BaseModel } from '../Common';

@Entity()
export class Tags extends BaseModel {
  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({ /* 名称 */ length: 50 }) name: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
