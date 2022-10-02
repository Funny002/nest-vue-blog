import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { PowerModel } from '@app/mysql/common';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { hasOverlap } from '@app/tools/array';

export enum PowerState {
  disable,
  enable,
}

export enum PowerType {
  URL,
  Operate,
  Group,
}

@Entity()
@Tree('closure-table')
@Index('index', ['type', 'name'])
export class Power extends PowerModel {
  
  @TreeParent() parent: PowerModel;
  
  @TreeChildren() children: PowerModel[];
  
  @Column({ comment: '名称', length: 100 }) name: string;
  
  @Column({ comment: '分类', type: 'enum', enum: PowerType, default: PowerType.URL }) type: PowerType;
  
  @Column({ comment: '状态', type: 'enum', enum: PowerState, default: PowerState.enable }) state: PowerState;
  
  /**
   * 判断子级是否相互排斥
   */
  static async hasMutualRepulsion<T extends Power>(this: { new(): T } & typeof Power, where: FindOptionsWhere<T>, depth: number = 0): Promise<boolean | undefined> {
    const list = await this.getFindChildren(where, depth);
    
    if (list) {
      const [keys, mutex]: [string[], string[]] = [[], []];
      
      for (const item of list) {
        keys.push(item.keys);
        mutex.push(...item.mutex);
      }
      
      return hasOverlap(keys, mutex);
    }
    
    return undefined;
  }
}
