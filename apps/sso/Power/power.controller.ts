import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { SsoPowerCreateDto, SsoPowerTreeDto } from '@app/dto/sso.power.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { PowerService } from './power.service';
import { Power } from '@app/mysql';
import { Request } from 'express';

@ApiTags('Power 权限')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  @ApiOperation({ summary: '添加' })
  async create(@Body() body: SsoPowerCreateDto) {
    const { status, message, data } = await Power.addData(await Power.of_create(body));
    return status ? data.id : ManualException(message);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  async save(@Param('id') id: number, @Body() body: SsoPowerCreateDto) {
    const { status, message, data } = await Power.saveData(id, await Power.of_create(body));
    return status ? data.raw : ManualException(message);
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    const { status, message, data } = await Power.removeData(ids);
    return status ? data.raw : ManualException(message);
  }

  @Get('list')
  @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  async list(@PaginationParams() page: PaginationRequest) {

    const params = page.params;
    if ('name' in params) params.name = `%${ params.name }%`;
    const data = await Power.getList(page, Power.handleWhere(params));
    return Pagination.of(page, data.count, data.list);
  }

  @Get('info/:id')
  @ApiOperation({ summary: '详情' })
  async info(@Req() req: Request, @Param('id') id: number) {
    return await Power.getInfoKeys({ id });
  }

  @Get('tree/:id?')
  @ApiOperation({ summary: '列表树' })
  async getTreeChildren(@Param('id') id: number, @Query() query: SsoPowerTreeDto) {
    id = isNaN(id) ? 0 : id;
    if (!id) return await Power.of_Tree('root');

    if (!(await Power.hasKeys({ id }))) ManualException('未找到数据');

    return await Power[`get${ Boolean(query.tree) ? 'Tree' : 'Find' }Children`]({ id }, +(query.deep || 0));
  }
}
