import { Column, Entity, Like, Tree, TreeChildren, TreeParent } from 'typeorm';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { BaseState, PowerModel } from '@app/mysql/common';

@Entity()
@Tree('closure-table')
export class Power extends PowerModel {
  @TreeParent() pid: Power;

  @TreeChildren() children: Power[];

  @Column({ /* 标签 */ length: 100 }) tags: string;

  @Column({ /* 名称 */ length: 100 }) name: string;

  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({  /* 内容 */ type: 'simple-array' }) values: string[];

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  static async of_create(body: SsoPowerCreateDto) {
    const target = new Power();
    target.keys = body.keys;
    target.name = body.name;
    target.tags = body.tags;
    target.state = body.state;
    target.mutex = body.mutex;
    target.values = body.values;
    if ('parent' in body) target.pid = body.parent ? await Power.getInfoKeys({ id: body.parent }) : null;
    return target;
  }

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      tags: { name: 'tags' },
      keys: { name: 'keys' },
      name: { name: 'name', handle: Like },
    };
  }
}
