import { SsoMenuCreateDto, SsoMenuPageDto, SsoMenuTreeDto } from '@app/dto/sso.menu.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { Repository } from 'typeorm';
import { Menu } from '@app/mysql';
import { reWriteObj } from '@app/tools';

@ApiTags('Menu 菜单')
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  @Post()
  @ApiOperation({ summary: '添加' })
  async add(@Body() body: SsoMenuCreateDto) {
    const { status, message, data } = await Menu.addData(await Menu.of_create(body));
    return status ? data.id : ManualException(message);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  async save(@Param('id') id: number, @Body() body: SsoMenuCreateDto) {
    const { status, message, data } = await Menu.saveData(id, await Menu.of_create(body));
    return status ? data.affected : ManualException(message);
  }

  @Put('state/:id')
  @ApiOperation({ summary: '状态修改' })
  async saveState(@Param('id') id: number, @Body('state') state: number) {
    return (await this.menuRepository.update({ id }, { state })).raw;
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    const { status, message, data } = await Menu.removeData(ids);
    return status ? data.affected : ManualException(message);
  }

  @Get('list')
  @ApiOperation({ summary: '列表' })
  async getList(@PaginationParams() page: PaginationRequest<SsoMenuPageDto>) {
    const params = page.params;
    if ('name' in params) params.name = `%${ params.name }%`;
    const data = await Menu.getList(page, Menu.handleWhere(params));
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

  @Get('router')
  @ApiOperation({ summary: '路由' })
  async getRouter(@Query('tags') tags: string) {
    const where = Menu.handleWhere({ types: 'router', state: 1, tags });
    const list = await this.menuRepository.createQueryBuilder().where(where).select('*').addSelect('pidId', 'parent').getRawMany();
    return list.map(item => reWriteObj(item, ['id', 'sort', 'keys', 'name', 'values', 'icon', 'parent']));
    // return nestedParseList(await this.menuRepository.manager.getTreeRepository(Menu).findTrees());
    // return await Menu.getList({}, Menu.handleWhere({ types: 'router', state: 1, tags }));
  }

  @Get('options')
  @ApiOperation({ summary: '路由选项' })
  async getOptions(@Query('tags') tags: string) {
    const data = await Menu.getList({}, Menu.handleWhere({ tags }));
    return (<Menu[]>data.list).map(item => ({ label: item.name, value: item.id }));
  }
}
