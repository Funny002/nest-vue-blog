import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { SsoSettingCreateDto, SsoSettingPageDto } from '@app/dto/sso.setting.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseState, Setting, SettingPower } from '@app/mysql';
import { ManualException } from '@app/common/error';
import { SettingService } from './setting.service';
import { NoAuth } from '@app/common/jwtAuth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('setting 设置')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  async add(@Body() body: SsoSettingCreateDto) {
    const { status, message, data } = await Setting.addData(Setting.of_create(body));
    return status ? data.id : ManualException(message);
  }

  @Put(':id')
  async save(@Param('id') id: number, @Body() body: SsoSettingCreateDto) {
    const { status, message, data } = await Setting.saveData(id, Setting.of_create(body));
    return status ? data.affected : ManualException(message);
  }

  @Delete()
  async remove(@Body('ids') ids: number[]) {
    const { status, message, data } = await Setting.removeData(ids);
    return status ? data.affected : ManualException(message);
  }

  @Get('list')
  async getList(@PaginationParams() page: PaginationRequest<SsoSettingPageDto>) {
    const params = page.params;
    if ('name' in params) params.name = `%${ params.name }%`;
    const data = await Setting.getList(page, Setting.handleWhere(params));
    return Pagination.of(page, data.count, data.list);
  }

  @Get('info/:id')
  async getInfo(@Param('id') id: number) {
    return await Setting.getInfoKeys({ id });
  }

  @NoAuth()
  @Get('public/:tags')
  async getPublicList(@Param('tags') tags: string) {
    const select = { title: true, note: true, value: true, update_time: true };
    return await Setting.getKeys({ tags, state: BaseState.Enable, power: SettingPower.Public }, select);
  }
}
