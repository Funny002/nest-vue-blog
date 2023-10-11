import { Pagination, PaginationParams, PaginationRequest } from '@app/pagination';
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { reWriteDiffObj } from '@app/tools';
import { ApiTags } from '@nestjs/swagger';
import { Users } from '@app/mysql';

@Controller('users')
@ApiTags('Users 用户')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  async getList(@PaginationParams() page: PaginationRequest) {
    function handlerUsers(users: Users[]) {
      return users.map(user => reWriteDiffObj(user, ['pass', 'lock_time', 'lock_count', 'href', 'update_time', 'explain']));
    }

    const { count, list } = await Users.getList(page, Users.handleWhere(page.params), handlerUsers);
    return Pagination.of(page, count, list);
  }

  @Get('info/:id')
  async getInfo(@Param('id') id: number) {
    const base = await Users.getKeys({ id });
    return { base };
  }
}
