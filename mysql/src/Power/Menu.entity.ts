import { PowerModel, BaseState } from '@app/mysql/common';
import { Column, Entity, Index, Tree, TreeChildren, TreeParent } from 'typeorm';
import { SsoMenuCreateDto } from '@app/dto/sso.menu.dto';

export enum MenuTypes {
  Router = 'router', // 路由
  Button = 'button', // 按钮
  Redirect = 'redirect', // 重定向
  Resource = 'resource', // 资源
  Operation = 'operation', // 操作
}

@Entity()
@Tree('closure-table')
@Index('index', ['keys', 'name', 'types'])
export class Menu extends PowerModel {
  @TreeParent() pid: Menu;

  @TreeChildren() children: Menu[];

  @Column({ length: 100, comment: '标签' }) tags: string;

  @Column({ length: 100, comment: '名称' }) name: string;

  @Column({ length: 100, comment: '标识' }) keys: string;

  @Column({ type: 'enum', enum: MenuTypes, default: MenuTypes.Router, comment: '分类' }) types: MenuTypes;

  @Column({ length: 255, comment: '内容', nullable: true }) values: string;

  @Column({ type: 'enum', enum: BaseState, default: BaseState.Disable, comment: '状态' }) state: BaseState;

  static async of_create(body: SsoMenuCreateDto) {
    const target = new Menu();
    target.tags = body.tags;
    target.name = body.name;
    target.keys = body.keys;
    target.types = body.types;
    target.state = body.state;
    target.values = body.values;
    if (body.parent) target.pid = await Menu.getInfoKeys({ id: body.parent });
    return target;
  }
}
