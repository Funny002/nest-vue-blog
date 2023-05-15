import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '@app/mysql';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private powerRoleRepository: Repository<Role>,
  ) {}

  handleWhere(params: { [key: string]: any }): FindOptionsWhere<Role> {
    const where: FindOptionsWhere<Role> = {};

    if (params.name) where.name = Like(`%${ params.name }%`);

    if (params.state) where.state = params.state;

    return where;
  }

  async addList(body: SsoRoleCreateDto) {
    if (await Role.hasKeys([{ keys: body.keys }, { name: body.name }])) ManualException('标识或名称已存在');

    return this.powerRoleRepository.save(await Role.of_create(body));
  }
}
