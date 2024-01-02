import { SettingCreateDto, SettingDeleteDto, SettingUpdateDto } from './dto/index.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { ManualHttpException } from '@libs/error';
import { IsAdmin, NoAuth } from '@libs/jwtAuth';
import { In, Not } from 'typeorm';
import { Setting } from '@mysql';

@Controller('settings')
@ApiTags('settings 设置')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @IsAdmin()
  @ApiOperation({ summary: '添加设置' })
  async create(@Body() body: SettingCreateDto) {
    if (await Setting.countBy({ keys: body.keys })) return ManualHttpException('标识已存在');
    return await Setting.save(this.settingsService.create(body));
  }

  @IsAdmin()
  @Put(':id')
  @ApiOperation({ summary: '修改设置' })
  async update(@Param('id') id: number, @Body() body: SettingUpdateDto) {
    if (await Setting.countBy({ id })) return ManualHttpException('数据不存在');
    if (await Setting.countBy({ id: Not(id), keys: body.keys })) return ManualHttpException('标识已存在');
    return await Setting.update({ id }, body);
  }

  @Delete()
  @IsAdmin()
  @ApiOperation({ summary: '删除设置' })
  async delete(@Body() body: SettingDeleteDto) {
    return await Setting.delete({ id: In(body.ids) });
  }

  @Get()
  @NoAuth()
  @ApiOperation({ summary: '获取设置，公共' })
  async get() {
    return this.settingsService.handlerConfig(await Setting.getKeys({ power: 'public', state: 'enable' }));
  }

  @Get('config')
  @ApiOperation({ summary: '获取设置，用户' })
  async getConfig() {
    return this.settingsService.handlerConfig(await Setting.getKeys({ power: 'users', state: 'enable' }));
  }

  @IsAdmin()
  @Get(':type')
  @ApiOperation({ summary: '获取设置, 管理员' })
  async getTypeConfig(@Param('type') type: string) {
    const list = await Setting.getKeys({ type });
    return this.settingsService.handlerConfig(list, false);
  }

  @IsAdmin()
  @Get('info/:id')
  @ApiOperation({ summary: '获取设置详情' })
  async getInfo(@Param('id') id: number) {
    return await Setting.getInfoKeys({ id });
  }
}
