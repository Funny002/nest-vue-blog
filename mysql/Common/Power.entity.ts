import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Column, ObjectLiteral } from 'typeorm';
import { BaseModel } from '@app/mysql/common';

export abstract class PowerModel extends BaseModel {

  @Column({ comment: '标识' }) keys: string;

  @Column({ comment: '与 key 相互排斥', type: 'simple-array' }) mutex: string[];

  /**
   * 根据 "where" 获取全部子级，列表展开
   */
  static async getFindChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth: number = 0): Promise<null | T[]> {
    const parent = await this.getInfoKeys(where);

    if (!parent) return null;

    return (await this.getRepository().manager.getTreeRepository(this.constructor).findDescendants(parent, { depth })) as T[];
  }

  /**
   * 根据 "where" 获取全部子级，树形节点
   */
  static async getTreeChildren<T extends PowerModel>(this: { new(): T } & typeof PowerModel, where: FindOptionsWhere<T> | FindOptionsWhere<T>[], depth: number = 0): Promise<null | ObjectLiteral> {
    const parent = await this.getInfoKeys(where);

    if (!parent) return null;

    return (await this.getRepository().manager.getTreeRepository(this.constructor).findDescendantsTree(parent, { depth }));
  }
}
