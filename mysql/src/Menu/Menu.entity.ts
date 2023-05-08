import { PowerModel, BaseState } from '@app/mysql/common';
import { Column, Entity, Index, Tree, TreeParent } from 'typeorm';

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

  @Column({ length: 100, comment: '名称' }) tags: string;

  @Column({ length: 100, comment: '名称' }) name: string;

  @Column({ length: 100, comment: '标识' }) keys: string;

  @Column({ type: 'enum', enum: MenuTypes, default: MenuTypes.Router, comment: '分类' }) types: MenuTypes;

  @Column({ length: 255, comment: '内容', nullable: true }) value: string;

  @Column({ type: 'enum', enum: BaseState, default: BaseState.Disable, comment: '状态' }) state: BaseState;
}
