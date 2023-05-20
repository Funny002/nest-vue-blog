import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { SsoRoleCreateDto, SsoRoleTreeDto } from '@app/dto/sso.role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Role } from '@app/mysql';

@ApiTags('Role 角色')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role) private powerRoleRepository: Repository<Role>,
  ) {}

  @Post()
  @ApiOperation({ summary: '添加' })
  async create(@Body() body: SsoRoleCreateDto) {
    const { status, message, data } = await Role.addData(await Role.of_create(body));
    return status ? data.id : ManualException(message);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  async save(@Param('id') id: number, @Body() body: SsoRoleCreateDto) {
    const { status, message, data } = await Role.saveData(id, await Role.of_create(body));
    return status ? data.affected : ManualException(message);
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    const { status, message, data } = await Role.removeData(ids);
    return status ? data.affected : ManualException(message);
  }

  @Get('list')
  @ApiOperation({ summary: '获取权限 ~ 分页列表' })
  async list(@PaginationParams() page: PaginationRequest) {

    const params = page.params;
    if ('name' in params) params.name = `%${ params.name }%`;
    const data = await Role.getList(page, Role.handleWhere(params));
    return Pagination.of(page, data.count, data.list);
  }

  @Get('info/:id')
  @ApiOperation({ summary: '详情' })
  async info(@Req() req: Request, @Param('id') id: number) {
    return await Role.getInfoKeys({ id });
  }

  @Get('tree/:id?')
  @ApiOperation({ summary: '列表树' })
  async getTreeChildren(@Param('id') id: number, @Query() query: SsoRoleTreeDto) {
    id = isNaN(id) ? 0 : id;
    if (!id) return await Role.of_Tree('root');

    if (!(await Role.hasKeys({ id }))) ManualException('未找到数据');

    return await Role[`get${ Boolean(query.tree) ? 'Tree' : 'Find' }Children`]({ id }, +(query.deep || 0));
  }
}
