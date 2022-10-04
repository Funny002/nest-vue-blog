import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PowerRole } from '@app/mysql';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(PowerRole) private powerRoleRepository: Repository<PowerRole>,
  ) {}
  
  handleWhere(params: { [key: string]: any }): FindOptionsWhere<PowerRole> {
    const where: FindOptionsWhere<PowerRole> = {};
    
    if (params.name) where.name = Like(`%${params.name}%`);
    
    if (params.state) where.state = params.state;
    
    return where;
  }
  
  async addList(body: SsoRoleCreateDto) {
    if (await PowerRole.hasKeys([{ keys: body.keys }, { name: body.name }])) {
      throw new ManualException('标识或名称已存在');
    }
    
    return this.powerRoleRepository.save(await PowerRole.of_create(body));
  }
}
