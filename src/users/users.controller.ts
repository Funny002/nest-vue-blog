import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('user 用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 创建用户
  @Post()
  @ApiOperation({ summary: '创建用户' })
  async createUser() {}

  // 删除用户
  @Delete()
  @ApiOperation({ summary: '删除用户' })
  async delUser() {}

  // 更新用户
  @Put(':uid')
  @ApiOperation({ summary: '更新用户' })
  async saveUser() {}

  // 用户信息
  @Get('info')
  @ApiOperation({ summary: '用户信息' })
  async userInfo() {}

  // 列表
  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  async userList() {}
}
