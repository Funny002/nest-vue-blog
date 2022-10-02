import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { PowerModel } from '@app/mysql/common';
import { hasOverlap } from '@app/tools/array';
import { ManualException } from '@app/common/error';

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
  static async hasMutualRepulsion<T extends Power>(this: { new(): T } & typeof Power, where: FindOptionsWhere<T>, depth: number = 0): Promise<boolean> {
    const list = await this.getFindChildren(where, depth);
    
    if (list) {
      const [keys, mutex]: [string[], string[]] = [[], []];
      
      for (const item of list) {
        keys.push(item.keys);
        mutex.push(...item.mutex);
      }
      
      return hasOverlap(keys, mutex);
    }
    
    throw new ManualException('父级不存在');
  }
  
  static async of_create(body: SsoPowerCreateDto): Promise<Power> {
    const power = new Power();
    power.keys = body.keys;
    power.name = body.name;
    power.type = body.type;
    power.mutex = body.mutex;
    power.state = body.state;
    
    if (body.parent) {
      const parent = await this.getInfoKeys({ id: body.parent });
      
      if (!parent) {
        throw new ManualException('父级不存在');
      }
      
      if (parent.type !== PowerType.Group) {
        throw new ManualException('父级不是组');
      }
      
      power.parent = parent;
    }
    
    if (power.parent && power.mutex.length) {
      const state = await this.hasMutualRepulsion({ id: power.parent.id });
      
      if (state) {
        throw new ManualException('该组包含相互排斥的权限');
      }
    }
    
    return power;
  }
}
