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

  @Column({ /* 内容 */ length: 255, nullable: true }) values: string;

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  static async of_create(body: SsoRoleCreateDto) {
    const target = new Role();
    //
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
