import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseModel } from '../Common';

@Entity()
@Tree('closure-table')
export class FilesFolder extends BaseModel {
  @TreeParent() parent: FilesFolder;

  @TreeChildren() children: FilesFolder[];

  @Column({ /* uid */ }) uid: string;

  @Column({ /* 排序 */ default: 0 }) sort: number;

  @Column({ /* 上级id */ default: 0 }) pid: number;

  @Column({ /* 文件名 */ length: 200 }) name: string;

  @Column({ /* 图标 */ length: 100, default: '' }) icon: string;

  @Column({ /* 备注 */ length: 200, default: '' }) description: string;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
