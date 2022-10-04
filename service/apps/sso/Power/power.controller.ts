import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { SsoPowerCreateDto, SsoPowerSaveDto, SsoPowerTreeDto } from '@app/dto/sso.power.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { PowerService } from './power.service';
import { In, Repository } from 'typeorm';
import { Power } from '@app/mysql';
import { Request } from 'express';

@ApiTags('Power 权限')
@Controller('power')
export class PowerController {
  constructor(
    private readonly powerService: PowerService,
    @InjectRepository(Power) private powerRepository: Repository<Power>,
  ) {}
  
  @Post('create')
  @ApiOperation({ summary: '添加权限' })
  async create(@Req() req: Request, @Body() body: SsoPowerCreateDto) {
    return (await this.powerService.addList(body)).id;
  }
  
  @Get('list')
  @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  async list(@Req() req: Request, @PaginationParams() page: PaginationRequest) {
    const select: FindOptionsSelect<Power> = {};
    
    const where = this.powerService.handleWhere(page.params);
    
    const list = await this.powerRepository.find({ select, where, skip: (page.pageCount - 1) * page.pageSize, take: page.pageSize });
    
    const total = await this.powerRepository.countBy(where);
    
    return Pagination.of(page, total, list);
  }
  
  @Get('tree')
  @ApiOperation({ summary: '获取权限 ~ 树' })
  async tree(@Req() req: Request, @Query() query: SsoPowerTreeDto) {
    return await Power.getTreeChildren({ keys: query.keys }, Math.max(0, +(query.depth || '0')));
  }
  
  @Get('info/:id')
  @ApiOperation({ summary: '获取权限详情' })
  async info(@Req() req: Request, @Param('id') id: number) {
    return await Power.getInfoKeys({ id });
  }
  
  @Put('save/:id')
  @ApiOperation({ summary: '修改权限' })
  async save(@Req() req: Request, @Param('id') id: number, @Body() body: SsoPowerSaveDto) {
    if (!(await Power.hasKeys({ id }))) {
      throw new ManualException('未找到数据');
    }
    
    return (await this.powerRepository.update({ id }, await Power.of_create(body))).raw;
  }
  
  @Delete('remove/:id')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Req() req: Request, @Param('id') id: number, @Query('state') state: boolean) {
    const list = await Power.getFindChildren({ id: id }, 0);
    
    if (!list) {
      throw new ManualException('未找到数据');
    }
    
    if (list.length > 1 && !state) {
      throw new ManualException('当前组有子权限');
    }
    
    return (await this.powerRepository.delete({ id: In(list.map(v => v.id)) })).raw;
  }
}
