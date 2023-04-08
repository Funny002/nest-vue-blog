import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import Decimal from 'decimal.js';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键' }) id: number;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间', default: null }) create_time: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '更新时间', default: null }) update_time: Date;

  /** 根据 `where` 获取多条数据
   * 创建一个方法，可能没用
   */
  static getKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>): Promise<T[]> {
    return this.getRepository().find({ where, select }) as Promise<T[]>;
  }

  /** 根据 `where` 获取一条数据
   * 创建一个方法，可能没用
   */
  static getInfoKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], select?: FindOptionsSelect<T>): Promise<T> {
    return this.getRepository().findOne({ where, select }) as Promise<T>;
  }

  /** 根据 `where` 查询是否有数据
   * 创建一个方法，可能没用
   */
  static async hasKeys<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<boolean> {
    return (await this.getRepository().countBy(where)) > 0;
  }

  /** 引入 `Decimal` 修复 js 精度问题
   * 创建一个方法，可能没用
   */
  static async saveAmount<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>, prop: string, value: number, state: boolean): Promise<number> {
    const list = await this.getRepository().find({ where });
    let count = 0;
    for (const item of list) {
      const val = new Decimal(item[prop]);
      const data = { [prop]: val[state ? 'plus' : 'minus'](value).toNumber() };
      await this.getRepository().update({ id: item.id }, data);
      count++;
    }
    return count;
  }

  /** 根据 `where` 查询的数据 `prop` 增加数值
   * 创建一个方法，可能没用
   */
  static increment<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>, prop: string, value: number): Promise<number> {
    return this.saveAmount(where, prop, value, true);
  }

  /** 根据 `where` 查询的数据 `prop` 减少数值
   * 创建一个方法，可能没用
   */
  static decrement<T extends BaseModel>(this: { new(): T } & typeof BaseModel, where: FindOptionsWhere<T>, prop: string, value: number): Promise<number> {
    return this.saveAmount(where, prop, value, false);
  }
}
