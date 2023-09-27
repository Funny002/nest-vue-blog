import { Column, Entity, Index, Like, Tree, TreeChildren, TreeParent } from 'typeorm';
import { PowerModel, BaseState } from '@app/mysql/common';
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

  @Column({ /* 标签 */ length: 100 }) tags: string;

  @Column({ /* 名称 */ length: 100 }) name: string;

  @Column({ /* 排序*/ default: 0 }) sort: number;

  @Column({ /* 标识 */ length: 100 }) keys: string;

  @Column({ /* 图标 */ length: 50, nullable: true }) icon: string;

  @Column({ /* 内容 */ length: 255, nullable: true }) values: string;

  @Column({ /* 分类 */ type: 'enum', enum: MenuTypes, default: MenuTypes.Router }) types: MenuTypes;

  @Column({ /* 状态 */ type: 'enum', enum: BaseState, default: BaseState.Disable }) state: BaseState;

  static async of_create(body: SsoMenuCreateDto) {
    const target = new Menu();
    target.tags = body.tags;
    target.name = body.name;
    target.keys = body.keys;
    target.sort = body.sort;
    target.icon = body.icon;
    target.types = body.types;
    target.state = body.state;
    target.values = body.values;
    if ('parent' in body) target.pid = body.parent ? await Menu.getInfoKeys({ id: body.parent }) : null;
    return target;
  }

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      tags: { name: 'tags' },
      keys: { name: 'keys' },
      types: { name: 'types' },
      name: { name: 'name', handle: Like },
      state: { name: 'state', handle: String },
    };
  }
}
