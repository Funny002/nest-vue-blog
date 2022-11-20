import { BaseModel } from '@app/mysql/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Tags extends BaseModel {
  @Column({ comment: '标识', length: 100 }) keys: string;

  @Column({ comment: '名称', length: 50 }) name: string;
}
