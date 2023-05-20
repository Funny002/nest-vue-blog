import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Column, In, Not, ObjectLiteral } from 'typeorm';
import { ManualException } from '@app/common/error';
import { BaseModel } from './Base.entity';
import { mergeOptions } from '@app/tools';

export abstract class PowerModel extends BaseModel {
  @Column({ /* 标识 */ }) keys: string;

  @Column({ /* 与 key 相互排斥 */ type: 'simple-array', nullable: true }) mutex: string[];

  /**
   * 根据 "where" 获取全部子级
   * find/root depth 无效
   */
  static async of_Tree<T extends PowerModel>(this: { new(): T } & typeof PowerModel, types: 'tree' | 'find' | 'root', where?: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth = 0) {
    const target = this.getRepository().manager.getTreeRepository(this.target);

    if (types === 'root') return await target.findRoots({ depth });

    const parent = await this.getInfoKeys(where);

    if (!parent) return null;

    const Map = { 'find': 'findDescendants', 'tree': 'findDescendantsTree' };

    return await target[Map[types]](parent, { depth });
  }

  /**
   * 根据 "where" 获取全部子级，列表展开
   */
  static async getFindChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth = 0): Promise<null | T[]> {
    return await this.of_Tree('find', where, depth);
  }

  /**
   * 根据 "where" 获取全部子级，树形节点
   */
  static async getTreeChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth = 0): Promise<null | ObjectLiteral> {
    return await this.of_Tree('tree', where, depth);
  }

  /** 验证数据 */
  static async hasVerify<T extends BaseModel>(this: { new(): T } & typeof BaseModel, data: any, id?: number): Promise<{ status: boolean; message: string }> {
    const where = this.handleWhere(data);
    if (id) {
      if (id < 1) return { status: false, message: '参数错误' };
      if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };
      //
      where.id = Not(id);
    }
    if (data.parent && !(await this.hasKeys({ pid: data.parent } as any))) return { status: false, message: '父级不存在' };
    if (await this.hasKeys(where)) return { status: false, message: '重复的参数' };
    //
    return { status: true, message: '' };
  }

  /** 修改数据 */
  static async saveData<T extends BaseModel>(this: { new(): T } & typeof BaseModel, id: number, data: T): Promise<{ status: boolean; message: string; data?: any }> {
    const { status, message } = await this.hasVerify(data, id);
    if (!status) return { status: false, message };

    // 验证 互斥
    if ((data['mutex'] || []).length && data['pid']) {
      const list = await this.getRepository().manager.getTreeRepository(this.target).findDescendants(data['pid']);
      const maxCount: string[] = list.map(v => v['keys']).concat(data['mutex']);
      if ((new Set(maxCount)).size !== maxCount.length) return { status: false, message: '有相互排斥数据' };
    }

    return { status: true, data: await this.getRepository().save((data.id = id, data)), message: '' };
  }

  /** 删除数据 */
  static async removeData<T extends BaseModel>(this: { new(): T } & typeof BaseModel, ids: number[]): Promise<{ status: boolean; message: string; data?: DeleteResult }> {
    const id = In([...new Set(ids)]);
    if (!(await this.hasKeys({ id }))) return { status: false, message: '数据不存在' };

    if (await this.hasKeys({ pid: id, id: Not(id) } as any)) ManualException('请先删除子节点');

    return { status: true, data: await this.getRepository().delete({ id }), message: '' };
  }
}
