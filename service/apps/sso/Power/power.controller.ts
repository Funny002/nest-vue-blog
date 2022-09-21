import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { SsoPowerCreateDto, SsoPowerSaveDto, SsoPowerTreeDto } from '@app/dto/sso.power.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PowerService } from './power.service';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from '@app/mysql';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

@ApiTags('Power 权限')
@Controller('power')
export class PowerController {
  constructor(
    private readonly powerService: PowerService,
    @InjectRepository(Power) private powerRepository: Repository<Power>,
  ) {}
  
  @Post('create')
  @ApiOperation({ summary: '添加权限' })
  async createPower(@Req() req: Request, @Body() body: SsoPowerCreateDto) {
    return (await this.powerService.addPower(body))?.id;
  }
  
  @Get('list')
  @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  async getPowerList(@Req() req: Request, @PaginationParams() page: PaginationRequest) {
    const select: FindOptionsSelect<Power> = {};
    
    const where = this.powerService.handleWhere(page.params);
    
    const list = await this.powerRepository.find({ select, where, skip: (page.pageCount - 1) * page.pageSize, take: page.pageSize });
    
    const total = await this.powerRepository.countBy(where);
    
    return Pagination.of(page, total, list);
  }
  
  @Get('tree')
  @ApiOperation({ summary: '获取权限 ~ 树' })
  async getPowerTree(@Req() req: Request, @Query() query: SsoPowerTreeDto) {
    return await this.powerService.getTree(query.keys, Math.max(0, +query.depth) || undefined);
  }
  
  @Get('info/:id')
  @ApiOperation({ summary: '获取权限详情' })
  async GetPowerInfo(@Req() req: Request, @Param('id') id: number) {
  }
  
  @Put('save/:id')
  @ApiOperation({ summary: '修改权限' })
  async savePower(@Req() req: Request, @Param('id') id: number, @Body() body: SsoPowerSaveDto) {
  }
  
  @Delete('remove/:id')
  @ApiOperation({ summary: '删除权限' })
  async removePower(@Req() req: Request, @Param('id') id: number) {
  }
}
