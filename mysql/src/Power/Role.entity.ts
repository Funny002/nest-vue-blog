import { Column, Entity, Like, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseState, PowerModel } from '@app/mysql/common';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';

@Entity()
@Tree('closure-table')
export class Role extends PowerModel {
  @TreeParent() pid: Role;

  @TreeChildren() children: Role[];

  @Column({ /* 名称 */ }) name: string;

  @Column({ /* 标识 */ }) keys: string;

  @Column({ /* 名称 */ length: 100 }) tags: string;

  @Column({ /* 备注 */ length: 100 }) note: string;

  @Column({ /* 数量 */ type: 'tinyint' }) count: number;

  @Column({ /* 内容 */ type: 'simple-array', nullable: true }) values: string[];

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  static async of_create(body: SsoRoleCreateDto) {
    const target = new Role();
    target.name = body.name;
    target.keys = body.keys;
    target.tags = body.tags;
    target.note = body.note;
    target.state = body.state;
    target.count = body.count;
    target.values = body.values;
    if ('parent' in body) target.pid = body.parent ? await Role.getInfoKeys({ id: body.parent }) : null;
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
