import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { PowerModel } from '@app/mysql/common';
import { PowerState, PowerType } from '@app/mysql';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { hasOverlap, non_overlapping } from '@app/tools/array';

@Entity()
@Tree('closure-table')
@Index('unique', ['keys'], { unique: true })
export class PowerRole extends PowerModel {
  @TreeParent() parent: PowerModel;
  
  @TreeChildren() children: PowerModel[];
  
  @Column({ comment: '名称' }) name: string;
  
  @Column({ comment: '分层', default: 0 }) layered: number;
  
  @Column({ comment: '说明', default: null }) note: string;
  
  @Column({ comment: '数量', default: null }) count: number;
  
  @Column({ comment: '扩展', type: 'simple-array', default: null }) undock: string[];
  
  @Column({ comment: '移除', type: 'simple-array', default: null }) extend: string[];
  
  @Column({ comment: '状态', type: 'enum', enum: PowerState, default: PowerState.enable }) state: PowerState;
  
  /**
   * 获取子级列表（不包括权限）
   */
  static async getChildrenList<T extends PowerRole>(this: { new(): T } & typeof PowerRole, where: FindOptionsWhere<T>, depth: number = 0): Promise<{ [key: string]: string[] } | null> {
    const list = await this.getFindChildren(where, depth);
    
    if (list) {
      const [keys, mutex, undock, extend]: (string[])[] = [[], [], [], []];
      
      for (const item of list) {
        keys.push(item.keys);
        mutex.push(...item.mutex);
        //
        extend.push(...item.extend);
        undock.push(...item.undock);
      }
      
      return { keys, mutex, undock, extend };
    }
    
    return null;
  }
  // /**
  //  * 判断子级是否相互排斥, (不包括附加的)
  //  */
  // static async hasMutualRepulsion<T extends PowerRole>(this: { new(): T } & typeof PowerRole, where: FindOptionsWhere<T>, depth: number = 0): Promise<boolean | null> {
  //   const data = await this.getChildrenList(where, depth);
  //
  //   if (data) {
  //     return hasOverlap(non_overlapping(data.keys, data.extend), data.mutex);
  //   }
  //
  //   return null;
  // }
}
