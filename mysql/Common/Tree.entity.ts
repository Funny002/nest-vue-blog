import { BaseModel } from './Base.entity';
import { TreeRepository } from 'typeorm';

export abstract class TreeModel extends BaseModel {
  static getTreeRepository<T extends TreeModel>(this: { new(): T } & typeof TreeModel): TreeRepository<T> {
    // @ts-ignore
    return this.getRepository().manager.getTreeRepository(this);
  }
}
