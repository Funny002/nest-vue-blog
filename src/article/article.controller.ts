import { Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { PaginationParams, PaginationRequest } from '@libs/pagination';
import { ArticleCreateDto, ArticleListDto, ArticleUpdateDto } from './dto/index.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ManualHttpException } from '@libs/error';
import { NoAuth } from '@libs/jwtAuth';

@Controller('article')
@ApiTags('article 文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @NoAuth()
  @Get('list')
  @ApiOperation({ summary: '文章列表' })
  async list(@Query() query: ArticleListDto, @PaginationParams() page: PaginationRequest) {
    return await this.articleService.getArticleList(page, query);
  }

  @NoAuth()
  @Get('info/:id')
  @ApiOperation({ summary: '文章详情' })
  async info(@Param('id') id: number) {
    return await this.articleService.getArticleInfo(id, 'visitor');
  };

  @NoAuth()
  @Get(':role(user|admin)/list')
  @ApiOperation({ summary: '文章列表, 用户|管理员' })
  async listUser(@Req() req: Request, @Param('role') role: 'user' | 'admin', @Query() query: ArticleListDto, @PaginationParams() page: PaginationRequest) {
    const uid = req['user']?.uid;
    const userRole = await this.articleService.getUserRole(uid);
    if (role === 'admin' && userRole !== role) return ManualHttpException('暂无权限。');
    //
    return await this.articleService.getArticleList(page, query, role, uid);
  }

  @NoAuth()
  @Get(':role(user|admin)/info/:id')
  @ApiOperation({ summary: '文章详情, 用户|管理员' })
  async infoUser(@Req() req: Request, @Param('id') id: number, @Param('role') role: 'user' | 'admin') {
    const uid = req['user']?.uid;
    const userRole = await this.articleService.getUserRole(uid);
    if (role === 'admin' && userRole !== role) return ManualHttpException('暂无权限。');
    //
    return await this.articleService.getArticleInfo(id, role, uid);
  }

  @Post()
  @ApiOperation({ summary: '文章创建' })
  async create(@Req() req: Request, @Query() query: ArticleCreateDto) {
    return `create ${ req['user'].uid }`;
  }

  @Put(':id')
  @ApiOperation({ summary: '文章更新' })
  async update(@Req() req: Request, @Param('id') id: number, @Query() query: ArticleUpdateDto) {
    return `update ${ req['user'].uid } - ${ id }`;
  }

  @Delete(':id')
  @ApiOperation({ summary: '文章删除' })
  async delete(@Req() req: Request, @Param('id') id: number, @Query() query: ArticleCreateDto) {
    return `delete ${ req['user'].uid } - ${ id }`;
  }
}
