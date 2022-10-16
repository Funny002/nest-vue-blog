import { Column, Entity, In, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { hasOverlap, unique } from '@app/tools/array';
import { ManualException } from '@app/common/error';
import { PowerModel } from '@app/mysql/common';
import { Power, PowerState } from '@app/mysql';

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
  
  @Column({ comment: '状态', type: 'enum', enum: PowerState, default: PowerState.enable }) state: PowerState;
  
  /**
   * 获取子级列表（不包括权限）
   */
  static async getChildrenList<T extends PowerRole>(this: { new(): T } & typeof PowerRole, where: FindOptionsWhere<T>, depth: number = 0): Promise<{ [key: string]: string[] } | null> {
    const list = await this.getFindChildren(where, depth);
    
    if (list) {
      const [keys, mutex, undock]: (string[])[] = [[], [], [], []];
      
      for (const item of list) {
        keys.push(item.keys);
        mutex.push(...item.mutex);
        undock.push(...item.undock);
      }
      
      return { keys, mutex, undock };
    }
    
    return null;
  }
  
  static async of_create(body: SsoRoleCreateDto): Promise<PowerRole> {
    const role = new PowerRole();
    role.keys = body.keys; // 标识
    role.name = body.name; // 名称
    role.note = body.note; // 备注
    role.count = body.count; // 数量
    role.state = body.state; // 状态
    role.mutex = body.mutex; // 排除
    role.undock = body.undock; // 附加
    
    if (body.parent) {
      const parent = await PowerRole.getInfoKeys({ id: body.parent });
      
      if (!parent) {
        throw new ManualException('父级不存在');
      }
      
      role.parent = parent;
      
      role.layered = parent.layered + 1;
    }
    
    if (role.parent) {
      // 角色排除
      const { keys, mutex, undock } = await PowerRole.getChildrenList({ id: body.parent });
      
      if (hasOverlap(keys, role.mutex) || mutex.indexOf(role.keys)) {
        throw new ManualException('包含排斥的权限');
      }
      
      // 权限排斥
      const list = await Power.getKeys({ keys: In([].concat(role.undock, undock)) });
      
      let { keys: power_keys, mutex: power_mutex }: { [key: string]: string[] } = list.reduce(function (value, { keys, mutex }) {
        value.mutex.push(...mutex);
        value.keys.push(keys);
        return value;
      }, { keys: [], mutex: [] });
      
      if (hasOverlap(power_keys, power_mutex)) {
        throw new ManualException('包含排斥的权限');
      }
    }
    
    return role;
  }
}
