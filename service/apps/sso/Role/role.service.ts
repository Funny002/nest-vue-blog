import { Injectable } from '@nestjs/common';
import { Power, PowerRole } from '@app/mysql';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ManualException } from '@app/common/error';
import { hasOverlap } from '@app/tools/array';

@Injectable()
export class RoleService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(PowerRole) private powerRoleRepository: Repository<PowerRole>,
  ) {}
  
  async addRole(body) {
    try {
      return await PowerRole.getFindChildren({ id: 1 });
      // PowerRole.getInfoKeys({ id: 1 })
      // @ts-ignore
      // return await this.powerRoleRepository.getInfoKeys({ id: 1 });
      // return await  this.powerRoleRepository.g
    } catch (e) {
      throw new ManualException(e.message);
    }
  }
  
  // async getChildrenList(parent: PowerRole, depth = 1): Promise<PowerRole[]> {
  //   return await this.dataSource.manager.getTreeRepository(PowerRole).findDescendants(parent, { depth });
  // }
  //
  // async hasMutualRepulsion(keys: string): Promise<[boolean, ManualException]> {
  //   const parent = await this.powerRoleRepository.findOneBy({ keys });
  //
  //   if (parent) {
  //     const list = await this.getChildrenList(parent, 0);
  //     const [keys, mutex]: [string[], string[]] = [[], []];
  //
  //     for (const item of list) {
  //       keys.push(item.keys);
  //       if (item.mutex) {
  //         mutex.push(...item.mutex.slice(1, -1).split('|'));
  //       }
  //     }
  //
  //     return [hasOverlap(keys, mutex), undefined];
  //   }
  //
  //   return [undefined, new ManualException('父级不存在')];
  // }
  //
  // async hasKey<T = FindOptionsWhere<PowerRole>>(data: T | T[]): Promise<boolean> {
  //   return (await this.powerRoleRepository.countBy(data)) > 0;
  // }
  //
  // async getId(id: number): Promise<PowerRole | null> {
  //   return await this.powerRoleRepository.findOneBy({ id });
  // }
  //
  // async create(body: SsoRoleCreateDto): Promise<PowerRole> {
  //   const role = new PowerRole();
  //   role.keys = body.keys;
  //   role.name = body.name;
  //   role.note = body.note;
  //   role.count = body.count;
  //   role.state = body.state;
  //   role.mutex = `|${body.mutex.join('|')}|`;
  //   role.undock = `|${body.undock.join('|')}|`;
  //   role.extend = `|${body.extend.join('|')}|`;
  //   // 寻找父级
  //   if (body.parent) {
  //     const parent = await this.getId(body.parent);
  //
  //     if (!parent) {
  //       throw new ManualException('父级不存在');
  //     }
  //
  //     role.parent = parent;
  //   }
  //
  //   if (body.mutex.length) {
  //     role.mutex = `|${body.mutex.join('|')}|`;
  //     // 一个组中不能有排除的权限
  //     if (role.parent) {
  //       const childrenKeys = await this.getChildrenKeys(role.parent.keys, 0);
  //
  //       if (childrenKeys && hasOverlap(childrenKeys, body.mutex)) {
  //         throw new ManualException('子角色包含相互排斥的权限');
  //       }
  //     }
  //   }
  //
  //   return role;
  // }
  //
  // async addRole(body: SsoRoleCreateDto): Promise<PowerRole> {
  //   const role = await this.create(body);
  //
  //   if (await this.hasKey([{ keys: role.keys }, { name: role.name }])) {
  //     throw new ManualException('标识或角色已存在');
  //   }
  //
  //   return await this.powerRoleRepository.save(role);
  // }
}
