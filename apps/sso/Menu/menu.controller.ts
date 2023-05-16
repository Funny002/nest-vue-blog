import { SsoMenuCreateDto, SsoMenuPageDto, SsoMenuTreeDto } from '@app/dto/sso.menu.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { MenuService } from './menu.service';
import { Menu } from '@app/mysql';

@ApiTags('Menu 菜单')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService, @InjectRepository(Menu) private menuRepository: Repository<Menu>) {}

  @Post()
  @ApiOperation({ summary: '添加' })
  async add(@Body() body: SsoMenuCreateDto) {
    const verify_res = await this.menuService.verify(body);
    if (!verify_res.status) ManualException(verify_res.message);
    return (await this.menuService.createMenu(body)).id;
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  async save(@Param('id') id: number, @Body() body: SsoMenuCreateDto) {
    if (!(await Menu.hasKeys({ id }))) ManualException('未找到数据');

    // const status = await Menu.hasKeys([{ id: Not(id), name: body.name }, { id: Not(id), keys: body.keys }]);
    // if (status) ManualException('名称或标识重复');

    return (await this.menuService.saveMenu(id, body)).raw;
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    const val = In([...new Set(ids)]);

    // has data
    if (!(await Menu.hasKeys({ id: val }))) ManualException('数据不存在');

    // has children where pid in(ids) and id not(in(ids))
    if (await Menu.hasKeys({ pid: val, id: Not(val) })) ManualException('请先删除子节点');

    return (await this.menuRepository.delete({ id: val })).affected;
  }

  @Get('list')
  @ApiOperation({ summary: '列表' })
  async getList(@PaginationParams() page: PaginationRequest<SsoMenuPageDto>) {
    const data = await this.menuService.pagination(page, page.params);
    return Pagination.of(page, data.count, data.list);
  }

  @Get('info/:id')
  @ApiOperation({ summary: '详情' })
  async getInfo(@Param('id') id: number) {
    return await Menu.getInfoKeys({ id });
  }

  @Get('tree/:id?')
  @ApiOperation({ summary: '列表树' })
  async getTreeChildren(@Param('id') id: number, @Query() query: SsoMenuTreeDto) {
    id = isNaN(id) ? 0 : id;
    if (!id) return await Menu.of_Tree('root');

    if (!(await Menu.hasKeys({ id }))) ManualException('未找到数据');

    return await Menu[`get${ Boolean(query.tree) ? 'Tree' : 'Find' }Children`]({ id }, +(query.deep || 0));
  }
}
