import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export abstract class BaseModel extends BaseEntity {
  
  @PrimaryGeneratedColumn({ comment: '主键' }) id: number;
  
  @CreateDateColumn({ type: 'datetime', comment: '创建时间', default: null }) create_time: Date;
  
  @UpdateDateColumn({ type: 'datetime', comment: '更新时间', default: null }) update_time: Date;
  
  /**
   * 创建一个方法，可能没用
   */
  static getKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>, select?: FindOptionsSelect<T>): Promise<T[]> {
    return this.getRepository().find({ where, select }) as Promise<T[]>;
  }
  
  /**
   * 创建一个方法，可能没用
   */
  static getInfoKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>, select?: FindOptionsSelect<T>): Promise<T> {
    return this.getRepository().findOne({ where, select }) as Promise<T>;
  }
  
  /**
   * 创建一个方法，可能没用
   */
  static async hasKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>): Promise<boolean> {
    return (await this.getRepository().countBy(where)) > 0;
  }
}