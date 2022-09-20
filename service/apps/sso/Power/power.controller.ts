import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PaginationParams, PaginationRequest } from '@app/pagination';
import { SsoPowerCreateDto, SsoPowerSaveDto } from '@app/dto/sso.power.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PowerService } from './power.service';
import { Request } from 'express';

@ApiTags('Power 权限')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {
  }
  
  @Post('create')
  @ApiOperation({ summary: '添加权限' })
  async createPower(@Req() req: Request, @Body() body: SsoPowerCreateDto) {
  }
  
  @Get('list')
  @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  async getPowerList(@Req() req: Request, @PaginationParams() page: PaginationRequest) {
  }
  
  @Get('tree/:id')
  @ApiOperation({ summary: '获取权限 ~ 树' })
  async getPowerTree(@Req() req: Request, @Param('id') id = 0) {
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
