import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiTags } from '@nestjs/swagger';
import { SsoSettingCreateDto, SsoSettingPageDto } from '@app/dto/sso.setting.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from '@app/mysql';
import { In, Repository } from 'typeorm';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';

@ApiTags('setting 设置')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService, @InjectRepository(Setting) private settingRepository: Repository<Setting>) {}

  @Post()
  async add(@Body() body: SsoSettingCreateDto) {
    const verify_res = await this.settingService.verify(body);
    if (!verify_res.status) ManualException(verify_res.message);
    //
    return (await this.settingService.createSetting(body)).id;
  }

  @Put(':id')
  async save(@Param('id') id: number, @Body() body: SsoSettingCreateDto) {
    const verify_res = await this.settingService.verifySave(id, body);
    if (!verify_res.status) ManualException(verify_res.message);
    //
    return (await this.settingService.saveSetting(id, body)).raw;
  }

  @Delete()
  async remove(@Body('ids') ids: number[]) {
    const val = In([...new Set(ids)]);
    if (!!(await Setting.hasKeys({ id: val }))) ManualException('未找到数据');
    //
    return (await this.settingRepository.delete({ id: val })).raw;
  }

  @Get('list')
  async getList(@PaginationParams() page: PaginationRequest<SsoSettingPageDto>) {
    const data = await this.settingService.pagination(page, page.params);
    return Pagination.of(page, data.count, data.list);
  }

  @Get('info/:id')
  async getInfo(@Param('id') id: number) {
    return await Setting.getInfoKeys({ id });
  }
}
