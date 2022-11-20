import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { ManualException } from '@app/common/error';
import { PowerModel } from '@app/mysql/common';
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

  static async of_create(body: SsoPowerCreateDto): Promise<Power> {
    const power = new Power();
    power.keys = body.keys; // 标识
    power.name = body.name; // 名称
    power.type = body.type; // 分类
    power.mutex = body.mutex; // 排斥
    power.state = body.state; // 状态

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
      const list = await this.getFindChildren({ id: power.parent.id }, 0);

      const { keys, mutex }: { [key: string]: string[] } = list.reduce(function (value, { keys, mutex }) {
        value.mutex.push(...mutex);
        value.keys.push(keys);
        return value;
      }, { keys: [], mutex: [] });

      if (hasOverlap(keys, power.mutex) || mutex.indexOf(power.keys)) {
        throw new ManualException('包含排斥的权限');
      }
    }

    return power;
  }
}
