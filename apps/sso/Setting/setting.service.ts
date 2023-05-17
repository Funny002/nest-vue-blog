import { SsoSettingCreateDto, SsoSettingPageDto } from '@app/dto/sso.setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Not, Repository } from 'typeorm';
import { Setting } from '@app/mysql';
import { PaginationRequest } from '@app/pagination';

@Injectable()
export class SettingService {
  constructor(@InjectRepository(Setting) private settingRepository: Repository<Setting>) {}

  async verify(body: SsoSettingCreateDto) {
    const { keys, title, type, tags } = body;
    if (await Setting.hasKeys({ keys, title, type, tags })) return { status: false, message: '标识或名称已存在' };
    //
    return { status: true };
  }

  async verifySave(id: number, body: SsoSettingCreateDto) {
    const { keys, title, type, tags } = body;
    if (await Setting.hasKeys({ id: Not(id), keys, title, type, tags })) return { status: false, message: '标识或名称已存在' };
    //
    return { status: true };
  }

  async createSetting(body: SsoSettingCreateDto) {
    return await this.settingRepository.save(Setting.of_create(body));
  }

  async saveSetting(id: number, body: SsoSettingCreateDto) {
    return await this.settingRepository.update({ id }, Setting.of_create(body));
  }

  async pagination(page: PaginationRequest, where: any) {
    const { order, pageSize: take, pageSkip: skip } = page;
    if (('title' in where) && where.title) where.title = Like(`%${ where.title }%`);
    //
    return {
      count: await Setting.countBy(where),
      list: await this.settingRepository.find({ where, order, skip, take }),
    };
  }
}
