import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { UsersCreateDto, UsersDelDto, UsersPageDto, UsersSaveDto } from './dto/index.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { Setting, Users, UsersNameRecord, UserState } from '@mysql';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManualHttpException } from '@libs/error';
import { reWriteDiffObj } from '@utils/object';
import { UsersService } from './users.service';
import { BetweenMonth } from '@utils/date';
import { IsAdmin } from '@libs/jwtAuth';
import { In, Not } from 'typeorm';

@ApiTags('user 用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 创建用户
  @Post()
  @IsAdmin()
  @ApiOperation({ summary: '创建用户, 管理员' })
  async createUser(@Body() body: UsersCreateDto) {
    if (await Users.countBy({ name: body.name })) return ManualHttpException('昵称已存在');
    if (await Users.countBy({ email: body.email })) return ManualHttpException('邮箱已注册');
    //
    return await Users.save(await this.usersService.createUser(body));
  }

  // 删除用户
  @Delete()
  @IsAdmin()
  @ApiOperation({ summary: '删除用户, 管理员' })
  async delUser(@Body() body: UsersDelDto) {
    body.isDelete = body.isDelete || false;
    if (body.ids.length < 1) return ManualHttpException('不能为空数组');
    const count = await Users.countBy({ uid: In(body.ids) });
    if (count < body.ids.length) return ManualHttpException('部分用户不存在');
    //
    if (!body.isDelete) {
      return Users.update({ uid: In(body.ids) }, { state: UserState.DELETE });
    } else {
      return Users.delete({ uid: In(body.ids) });
    }
  }

  @Put()
  @ApiOperation({ summary: '更新用户信息' })
  async user(@Req() req: Request, @Body() body: UsersSaveDto) {
    const userInfo = await this.userSave(req['user'].uid, body, true);
    if (userInfo) return reWriteDiffObj(userInfo, ['role', 'state']);
    return ManualHttpException('未知异常');
  }

  // 更新用户
  @IsAdmin()
  @Put(':uid')
  @ApiOperation({ summary: '更新用户信息, 管理员' })
  async userSave(@Param('uid') uid: string, @Body() body: UsersSaveDto, isUser = false) {
    if (!uid) return ManualHttpException('用户不存在');
    const userInfo = await Users.getInfoKeys({ uid });
    if (!userInfo) return ManualHttpException('用户不存在');
    if (body.name && body.name !== userInfo.name) {
      if (isUser) {
        // @ts-ignore
        const count = await UsersNameRecord.countBy({ uid, create_time: BetweenMonth() });
        const NameLimit = parseInt(((await Setting.getInfoKeys({ type: 'system', keys: 'userNameLimit' }, { value: true })) || { value: '0' }).value);
        if (NameLimit && count >= NameLimit) return ManualHttpException('本月名称修改已达上限');
      }
      if (await Users.countBy({ uid: Not(uid), name: body.name })) return ManualHttpException('用户名已存在');
      if (isUser) {
        await UsersNameRecord.save({ uid, name: body.name, lest_name: userInfo.name, is_user: 1, message: `用户手动将用户名 [${userInfo.name}] 更改为 [${body.name}]` });
      } else {
        await UsersNameRecord.save({ uid, name: body.name, lest_name: userInfo.name, message: `管理员手动将用户名 [${userInfo.name}] 更改为 [${body.name}]` });
      }
      userInfo.name = body.name;
      await Users.update({ uid }, { name: body.name });
    }
    await Users.update({ uid }, this.usersService.handleSave(body));
    return reWriteDiffObj(await Users.getInfoKeys({ uid }), ['pass']);
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
