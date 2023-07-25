import { BaseEntity, CreateDateColumn, In, Not, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { Repository } from 'typeorm/repository/Repository';
import { PaginationRequest } from '@app/pagination';
import Decimal from 'decimal.js';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ /* 主键 */ }) id: number;

  @CreateDateColumn({ /* 创建时间 */ type: 'datetime', default: null }) create_time: Date;

  @UpdateDateColumn({ /* 更新时间 */ type: 'datetime', default: null }) update_time: Date;

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
    return Boolean(await this.getRepository().findOneBy(where));
    // return (await this.getRepository().countBy(where)) > 0;
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

  /** 事务聚合 */
  static async transaction<T extends BaseModel, V extends any>(this: { new(): T } & typeof BaseModel, handler: (query: EntityManager, repository: Repository<T>) => Promise<V>): Promise<V> {
    const queryRunner = this.getRepository().metadata.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const repository = manager.getRepository(this) as Repository<T>;
      const result = await handler(manager, repository);
      await queryRunner.commitTransaction();
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new Error('Transaction failed');
    } finally {
      await queryRunner.release();
    }
  }

  /** 一些基础方法 */
  protected abstract handleWhere(): { [Label: string]: { name?: string, handle?: any } }

  static handleWhere<T extends BaseModel>(this: { new(): T } & typeof BaseModel, data: any): { [Name: string]: any } {
    if ('handleWhere' in this.prototype) {
      const whereObj = this.prototype.handleWhere();
      return Object.entries<{ name?: string; handle?: any }>(whereObj).reduce(function(value, obj) {
        const [keys, { name, handle }] = obj;
        if (keys in data) value[name || keys] = handle ? handle(data[keys]) : data[keys];
        return value;
      }, {});
    }
    //
    return {};
  }

  /** 验证一些东西 */
  static async hasVerify<T extends BaseModel>(this: { new(): T } & typeof BaseModel, data: any, id?: number): Promise<{ status: boolean, message: string }> {
    const where = this.handleWhere(data);

    if (id) {
      if (id < 1) return { status: false, message: '参数错误' };
      if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };
      //
      where.id = Not(id);
    }

    if (await this.hasKeys(where)) return { status: false, message: '重复的参数' };

    return { status: true, message: '' };
  }

  /** 添加数据 */
  static async addData<T extends BaseModel>(this: { new(): T } & typeof BaseModel, data: T): Promise<{ status: boolean; message: string; data?: T }> {
    const verify = await this.hasVerify(data);
    if (!verify.status) return verify as { status: false, message: string };
    //
    return { status: true, data: await this.getRepository().save(data), message: '' };
  }

  /** 修改数据 */
  static async saveData<T extends BaseModel>(this: { new(): T } & typeof BaseModel, id: number, data: any): Promise<{ status: boolean; message: string; data?: UpdateResult }> {
    const verify = await this.hasVerify(data, id);
    if (!verify.status) return verify as { status: false, message: string };
    //
    return { status: true, data: await this.getRepository().update({ id }, data), message: '' };
  }

  /** 删除数据 */
  static async removeData<T extends BaseModel>(this: { new(): T } & typeof BaseModel, ids: number[]): Promise<{ status: boolean; message: string; data?: DeleteResult }> {
    const id = In([...new Set(ids)]);
    if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };
    return { status: true, data: await this.getRepository().delete({ id }), message: '' };
  }

  /** 列表数据 */
  static async getList<T extends BaseModel>(this: { new(): T } & typeof BaseModel, page: PaginationRequest, where: FindOptionsWhere<T>[] | FindOptionsWhere<T>) {
    const { order, pageSize: take, pageSkip: skip } = page;
    // const where = this.handleWhere(page.params);
    return {
      count: await this.getRepository().countBy(where),
      list: await this.getRepository().find({ where, order, skip, take }),
    };
  }
}

export enum BaseState {
  Check = -2, // 审核/检查
  Freeze = -1, // 冻结
  Disable = 0, // 禁用
  Enable = 1, // 启用
  Delete = 2, // 删除
  Lock = 4, // 锁定
}
