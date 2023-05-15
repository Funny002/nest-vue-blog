import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { SsoMenuCreateDto } from '@app/dto/sso.menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { In, Repository } from 'typeorm';
import { Menu } from '@app/mysql';

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
    const verify_res = await this.menuService.verify(body);
    if (!verify_res.status) ManualException(verify_res.message);
    return (await this.menuService.createMenu(body)).id;
  }

  @Put(':id')
  @ApiOperation({ summary: '修改' })
  async save(@Param('id') id: number, @Body() body: SsoMenuCreateDto) {
    const status = await Menu.hasKeys({ id });
    if (!status) ManualException('未找到数据');
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    // return (await this.menuRepository.delete({ id: In([...new Set(ids)]) })).raw;
    return (await this.menuRepository.delete({ id: In([...new Set(ids)]) })).raw;
  }

  @Get('info/:id')
  @ApiOperation({ summary: '详情' })
  async getInfo(@Param('id') id: number) {
    return await Menu.getInfoKeys({ id });
  }

  @Get('list')
  @ApiOperation({ summary: '列表' })
  async getList(@PaginationParams() page: PaginationRequest) {
    const count = 0;
    const list = [];
    //
    return Pagination.of(page, count, list);
  }

  @Get('tree/:id')
  @ApiOperation({ summary: '列表书' })
  async getTree() {}
}
