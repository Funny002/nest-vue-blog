import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Column, ObjectLiteral } from 'typeorm';
import { BaseModel } from '@app/mysql/common';

export abstract class PowerModel extends BaseModel {
  @Column({ comment: '标识' }) keys: string;

  @Column({ comment: '与 key 相互排斥', type: 'simple-array', nullable: true }) mutex: string[];

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
  static getFindChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth = 0): Promise<null | T[]> {
    return this.of_Tree('find', where, depth);
  }

  /**
   * 根据 "where" 获取全部子级，树形节点
   */
  static async getTreeChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth = 0): Promise<null | ObjectLiteral> {
    return this.of_Tree('tree', where, depth);
  }
}
