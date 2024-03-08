import { ArticleCreateDto, ArticleDeleteDto, ArticleListDto, ArticleUpdateDto } from './dto/index.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Pagination, PaginationParams, PaginationRequest } from '@libs/pagination';
import { Articles, ArticleState, ArticlesVerify } from '@mysql';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesQueueName } from '@libs/bullQueue';
import { ArticleService } from './article.service';
import { ManualHttpException } from '@libs/error';
import { IsAdmin, NoAuth } from '@libs/jwtAuth';
import { InjectQueue } from '@nestjs/bull';
import { In, Like, Not } from 'typeorm';
import { Queue } from 'bull';

@Controller('article')
@ApiTags('article 文章')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    @InjectQueue(ArticlesQueueName) private readonly articlesQueue: Queue,
  ) {}

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
  async create(@Req() req: Request, @Body() body: ArticleCreateDto) {
    const count = await Articles.countBy({ title: Like(body.title), state: ArticleState.PASS });
    if (count) return ManualHttpException('文章标题已存在。');
    return (await Articles.save(this.articleService.createArticle(body, req['user']))).id;
  }

  @Put()
  @ApiOperation({ summary: '文章更新' })
  async update(@Req() req: Request, @Body() body: ArticleUpdateDto) {
    const uid = req['user'].uid;
    const list = await Articles.getKeys({ uid, id: In(body.ids) });
    if (list.length !== body.ids.length) return ManualHttpException('文章不存在或无修改权限。');
    const data = this.articleService.createArticle(body);
    return (await Articles.update({ id: In(body.ids), uid }, data)).affected;
  }

  @Delete()
  @ApiOperation({ summary: '文章删除' })
  async delete(@Req() req: Request, @Body() body: ArticleDeleteDto) {
    const uid = req['user'].uid;
    const count = await Articles.countBy({ uid, id: In(body.ids) });
    if (count !== body.ids.length) return ManualHttpException('文章不存在或无删除权限。');
    let data: Partial<Articles> = { state: ArticleState.REMOVE };
    if (body.isAll) Object.assign(data, { files: [], tags: [], types: [], content: '', attachment: [] });
    return (await Articles.update({ id: In(body.ids), uid }, data)).affected;
  }

  @Post('publish/:id')
  @ApiOperation({ summary: '文章发布' })
  async publish(@Req() req: Request, @Param('id') id: number) {
    const info = await Articles.getInfoKeys({ uid: req['user'].uid, id, state: Not(ArticleState.REMOVE) });
    if (!info) return ManualHttpException('文章不存在。');
    //
    const StateMap = { 'pass': '已通过', 'not_pass': '未通过', 'archive': '已归档', 'verify': '审核中' };
    if (Object.keys(StateMap).includes(info.state)) return ManualHttpException(StateMap[info.state]);
    //
    try {
      await Articles.getRepository().update({ id: info.id }, { state: ArticleState.VERIFY });
      await this.articlesQueue.add('handler', { id });
      return '审核中，请赖心等待';
    } catch (e) {
      console.log(e.message);
      return ManualHttpException('未知异常', 3);
    }
  }

  @IsAdmin()
  @Put('admin')
  @ApiOperation({ summary: '文章更新，管理员' })
  async updateAdmin(@Body() body: ArticleUpdateDto) {
    const data = this.articleService.createArticle(body);
    return (await Articles.update({ id: In(body.ids) }, data)).affected;
  }

  @IsAdmin()
  @Delete('admin')
  @ApiOperation({ summary: '文章删除，管理员' })
  async deleteAdmin(@Body() body: ArticleDeleteDto) {
    let data: Partial<Articles> = { state: ArticleState.REMOVE };
    if (body.isAll) Object.assign(data, { files: [], tags: [], types: [], content: '', attachment: [] });
    return (await Articles.update({ id: In(body.ids) }, data)).affected;
  }

  @IsAdmin()
  @Get('verify/list')
  @ApiOperation({ summary: '审核列表，管理员' })
  async verifyList(@Param('id') id: number = 0, @Query() query: ArticleListDto, @PaginationParams() page: PaginationRequest) {
    const { count, list } = await ArticlesVerify.getList(page, ArticlesVerify.handleWhere(query));
    return Pagination.of(page, count, list, query);
  }
}
