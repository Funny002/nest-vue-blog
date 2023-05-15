import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoPowerCreateDto } from '@app/dto/sso.power.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { handleParamsDate } from '@app/tools';
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

    // if (params.type) where.types = +params.type;
    //
    // if (params.state) where.state = +params.state;
    //
    // if (params.name) where.name = Like(`%${params.name}%`);
    //
    // if (params.create_time) {
    //   where.create_time = handleParamsDate(params.create_time, 'Y-M-D');
    // }

    return where;
  }

  async addList(body: SsoPowerCreateDto): Promise<Power> {
    if (await Power.hasKeys({ keys: body.keys })) ManualException('标识已存在');

    return this.powerRepository.save(await Power.of_create(body));
  }
}
