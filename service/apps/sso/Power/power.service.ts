import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { handleParamsDate } from '@app/tools/date';
import { Injectable } from '@nestjs/common';
import { Power } from '@app/mysql';

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
  
  async getChildrenList(parent: Power, depth = 1): Promise<Power[]> {
    return await this.dataSource.manager.getTreeRepository(Power).findDescendants(parent, { depth });
  }
  
  async addPower(data: SsoPowerCreateDto): Promise<Power> {
    // 保证 keys 或 name 是唯一
    const state = await this.hasKey([{ keys: data.keys }, { name: data.name }]);
    
    if (state) {
      throw new ManualException('标识或昵称已存在');
    }
    
    return await this.powerRepository.save(await Power.of_create(data));
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
