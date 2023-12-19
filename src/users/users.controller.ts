import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { reWriteDiffObj } from '@utils/object';
import { UsersService } from './users.service';
import { IsAdmin } from '@libs/jwtAuth';
import { Users } from '@mysql';
import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { UsersPageDto, UsersSaveDto } from './dto/index.dto';

@ApiTags('user 用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 创建用户
  @Post()
  @IsAdmin()
  @ApiOperation({ summary: '创建用户, 管理员' })
  async createUser() {
    return 'createUser';
  }

  // 删除用户
  @Delete()
  @IsAdmin()
  @ApiOperation({ summary: '删除用户, 管理员' })
  async delUser() {}

  @Put()
  @ApiOperation({ summary: '更新用户' })
  async user(@Req() req: Request, @Body() body: UsersSaveDto) {
    return reWriteDiffObj(await this.userSave(req['user'].uid, body), ['role', 'state']);
  }

  // 更新用户
  @IsAdmin()
  @Put(':uid')
  @ApiOperation({ summary: '更新用户, 管理员' })
  async userSave(@Param('uid') uid: string, @Body() body: UsersSaveDto) {
    return {};
  }

  // 用户信息
  @Get('info')
  @ApiOperation({ summary: '用户信息' })
  async info(@Req() req: Request) {
    return reWriteDiffObj(await this.userInfo(req['user'].uid), ['role', 'state']);
  }

  // 用户信息
  @IsAdmin()
  @Get('info/:uid')
  @ApiOperation({ summary: '用户信息, 管理员' })
  async userInfo(@Param('uid') uid: string) {
    return reWriteDiffObj(await Users.getInfoKeys({ uid }), ['pass']);
  }

  // 列表
  @IsAdmin()
  @Get('list')
  @ApiOperation({ summary: '用户列表, 管理员' })
  async list(@Query() query: UsersPageDto, @PaginationParams() page: PaginationRequest) {
    const { count, list } = await Users.getList(page, Users.handleWhere(query));
    return Pagination.of(page, count, list, query);
  }
}
