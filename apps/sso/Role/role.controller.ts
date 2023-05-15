import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { SsoRoleCreateDto, SsoRoleSaveDto, SsoRoleTreeDto } from '@app/dto/sso.role.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { In, Repository } from 'typeorm';
import { Role } from '@app/mysql';
import { Request } from 'express';

@ApiTags('Role 角色权限')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role) private powerRoleRepository: Repository<Role>,
  ) {}

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  async createRole(@Req() req: Request, @Body() body: SsoRoleCreateDto) {
    return (await this.roleService.addList(body)).id;
  }

  @Get('list')
  @ApiOperation({ summary: '分页列表' })
  async getList(@Req() req: Request, @PaginationParams() page: PaginationRequest) {
    const select: FindOptionsSelect<Role> = {};

    const where = this.roleService.handleWhere(page.params);

    const list = await this.powerRoleRepository.find({ select, where, skip: (page.pageCount - 1) * page.pageSize, take: page.pageSize });

    const total = await this.powerRoleRepository.countBy(where);

    return Pagination.of(page, total, list);
  }

  @Get('tree')
  @ApiOperation({ summary: '获取权限 ~ 树' })
  async tree(@Req() req: Request, @Query() query: SsoRoleTreeDto) {
    return await Role.getTreeChildren({ keys: query.keys }, Math.max(0, +(query.depth || '0')));
  }

  @Get('info/:id')
  @ApiOperation({ summary: '获取详情' })
  async info(@Req() req: Request, @Param('id') id: number) {
    return await Role.getInfoKeys({ id });
  }

  @Put('save/:id')
  @ApiOperation({ summary: '修改角色' })
  async save(@Req() req: Request, @Param('id') id: number, @Body() body: SsoRoleSaveDto) {
    if (!(await Role.hasKeys({ id }))) ManualException('未找到数据');

    return (await this.powerRoleRepository.update({ id }, await Role.of_create(body))).raw;
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: '删除角色' })
  async remove(@Req() req: Request, @Param('id') id: number, @Query('state') state: number) {
    const list = await Role.getFindChildren({ id });

    if (!list) ManualException('未找到数据');

    if (list.length > 1 && !state) ManualException('当前组有子权限');

    return (await this.powerRoleRepository.delete({ id: In(list.map(v => v.id)) })).raw;
  }
}
