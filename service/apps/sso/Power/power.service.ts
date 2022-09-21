import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { Power, PowerType } from '@app/mysql';
import { Injectable } from '@nestjs/common';
import { hasType } from '../../../tools/object';
import { handleParamsDate } from '../../../tools/date';

@Injectable()
export class PowerService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Power) private powerRepository: Repository<Power>,
  ) {}
  
  handleWhere(params: { [key: string]: any }): FindOptionsWhere<Power> {
    const where: FindOptionsWhere<Power> = {};
    
    if (params.type) where.type = +params.type;
    
    if (params.state) where.state = +params.state;
    
    if (params.name) where.name = Like(`%${params.name}%`);
    
    if (params.create_time) {
      where.create_time = handleParamsDate(params.create_time, 'Y-M-D');
    }
    
    return where;
  }
  
  async hasKey<T = FindOptionsWhere<Power>>(data: T | T[]): Promise<boolean> {
    return (await this.powerRepository.countBy(data)) > 0;
  }
  
  async getId(id: number): Promise<Power | null> {
    return await this.powerRepository.findOneBy({ id });
  }
  
  async create(data: SsoPowerCreateDto): Promise<Power> {
    const power = new Power();
    power.keys = data.keys;
    power.name = data.name;
    power.type = data.type;
    power.state = data.state;
    if (data.parent) {
      const powerParent = await this.getId(data.parent);
      // 保证父级符合规范
      if (!powerParent) {
        throw new ManualException('父级不存在');
      }
      if (powerParent.type !== PowerType.Group) {
        throw new ManualException('父级不是组');
      }
      power.parent = await this.getId(data.parent);
    }
    if (data.mutex.length) {
      power.mutex = `|${data.mutex.join('|')}|`;
    }
    return power;
  }
  
  async addPower(data: SsoPowerCreateDto): Promise<Power> {
    // 保证 keys 或 name 是唯一
    const state = await this.hasKey([{ keys: data.keys }, { name: data.name }]);
    if (state) {
      throw new ManualException('标识或昵称已存在');
    }
    return await this.powerRepository.save(await this.create(data));
  }
  
  async getTree(keys: string, depth: number = 0) {
    const state = await this.hasKey({ keys: keys });
    if (!state) {
      throw new ManualException(`未找到标识为${keys}的数据`);
    }
    const parent = await this.powerRepository.findOneBy({ keys });
    return await this.dataSource.manager.getTreeRepository(Power).findDescendantsTree(parent, { depth: depth || undefined });
  }
}
