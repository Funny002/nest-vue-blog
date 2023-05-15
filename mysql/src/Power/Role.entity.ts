import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseState, PowerModel } from '@app/mysql/common';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';

@Entity()
@Tree('closure-table')
export class Role extends PowerModel {
  @TreeParent() pid: Role;

  @TreeChildren() children: Role[];

  @Column({ comment: '名称' }) name: string;

  @Column({ comment: '标识' }) keys: string;

  @Column({ length: 100, comment: '名称' }) tags: string;

  @Column({ length: 255, comment: '内容', nullable: true }) values: string;

  @Column({ type: 'enum', enum: BaseState, default: BaseState.Disable, comment: '状态' }) state: BaseState;

  static async of_create(body: SsoRoleCreateDto) {
    const target = new Role();
    //
    return target;
  }
}
