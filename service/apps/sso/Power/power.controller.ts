import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { SsoPowerCreateDto, SsoPowerSaveDto, SsoPowerTreeDto } from '@app/dto/sso.power.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { PowerService } from './power.service';
import { Power, PowerType } from '@app/mysql';
import { In, Repository } from 'typeorm';
import { Request } from 'express';

@ApiTags('Power 权限')
@Controller('power')
export class PowerController {
  constructor(
    private readonly powerService: PowerService,
    @InjectRepository(Power) private powerRepository: Repository<Power>,
  ) {}
  
  // @Post('create')
  // @ApiOperation({ summary: '添加权限' })
  // async createPower(@Req() req: Request, @Body() body: SsoPowerCreateDto) {
  //   return (await this.powerService.addPower(body)).id;
  // }
  //
  // @Get('list')
  // @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  // async getPowerList(@Req() req: Request, @PaginationParams() page: PaginationRequest) {
  //   const select: FindOptionsSelect<Power> = {};
  //
  //   const where = this.powerService.handleWhere(page.params);
  //
  //   const list = await this.powerRepository.find({ select, where, skip: (page.pageCount - 1) * page.pageSize, take: page.pageSize });
  //
  //   const total = await this.powerRepository.countBy(where);
  //
  //   return Pagination.of(page, total, list);
  // }
  //
  // @Get('tree')
  // @ApiOperation({ summary: '获取权限 ~ 树' })
  // async getPowerTree(@Req() req: Request, @Query() query: SsoPowerTreeDto) {
  //   return await this.powerService.getTree(query.keys, Math.max(0, +query.depth) || undefined);
  // }
  //
  // @Get('info/:id')
  // @ApiOperation({ summary: '获取权限详情' })
  // async GetPowerInfo(@Req() req: Request, @Param('id') id: number) {
  //   return await this.powerService.getId(id);
  // }
  //
  // @Put('save/:id')
  // @ApiOperation({ summary: '修改权限' })
  // async savePower(@Req() req: Request, @Param('id') id: number, @Body() body: SsoPowerSaveDto) {
  //   const parent = await this.powerService.getId(id);
  //
  //   if (!parent) {
  //     throw new ManualException('未找到数据');
  //   }
  //
  //   return (await this.powerRepository.update({ id }, await this.powerService.create(body))).raw;
  // }
  //
  // @Delete('remove/:id')
  // @ApiOperation({ summary: '删除权限' })
  // async removePower(@Req() req: Request, @Param('id') id: number, @Query('state') state: boolean) {
  //   const parent = await this.powerService.getId(id);
  //
  //   if (!parent) {
  //     throw new ManualException('未找到数据');
  //   }
  //
  //   if (parent.type === PowerType.Group) {
  //     const list = await this.powerService.getChildrenList(parent);
  //
  //     if (list.length && !state) {
  //       throw new ManualException('当前组有子权限');
  //     }
  //
  //     return (await this.powerRepository.delete({ id: In(list.map(v => v.id)) })).raw;
  //   }
  //
  //   return (await this.powerRepository.delete({ id })).raw;
  // }
}
