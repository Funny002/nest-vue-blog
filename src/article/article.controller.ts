import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { ArticleListDto } from './dto/index.dto';
import { UsersPageDto } from '../users/dto/index.dto';
import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { Users } from '@mysql';

@Controller('article')
@ApiTags('article 文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  async list(@Query() query: ArticleListDto, @PaginationParams() page: PaginationRequest) {
    const { count, list } = await Articles.getList(page, Users.handleWhere(query));
    return Pagination.of(page, count, list, query);
  }
}
