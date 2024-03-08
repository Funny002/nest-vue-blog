import { Pagination, PaginationRequest } from '@libs/pagination';
import { Articles, ArticleState, Users } from '@mysql';
import { ArticleCreateDto, ArticleListDto, ArticleUpdateDto } from './dto/index.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  async getUserRole(uid: string) {
    return (await Users.getInfoKeys({ uid }, { role: true }))?.role || 'visitor';
  }

  async getArticleList(page: PaginationRequest, query: ArticleListDto, role: 'admin' | 'user' | 'visitor' = 'visitor', uid?: string) {
    let where = Object.assign({}, query);
    if (role === 'user') {
      where = Object.assign({}, where, { uid });
    } else {
      const state = [ArticleState.PASS, ArticleState.ARCHIVE];
      if (role === 'admin') state.push(ArticleState.NOT_PASS);
      where = Object.assign({}, where, { state });
    }
    const { count, list } = await Articles.getList(page, Articles.handleWhere(where));
    return Pagination.of(page, count, list, query);
  }

  async handlerArticle(info: Articles) {
    return Object.assign({}, info);
  }

  async getArticleInfo(id: number, role: 'admin' | 'user' | 'visitor' = 'visitor', uid?: string) {
    const where = { id };
    if (role === 'user') {
      where['uid'] = uid;
    } else {
      const state = [ArticleState.PASS, ArticleState.ARCHIVE];
      if (role === 'admin') state.push(ArticleState.NOT_PASS);
      where['state'] = state;
    }
    const info = await Articles.getInfoKeys(Articles.handleWhere(where));
    return await this.handlerArticle(info);
  }

  createArticle(body: ArticleCreateDto | ArticleUpdateDto, user?: any) {
    const info = new Articles();
    if (user) {
      info.uid = user.uid;
      info.name = user.name;
      info.avatar = user.avatar;
    }
    //
    info.title = body.title;
    info.content = body.content;
    info.state = ArticleState.DRAFT;
    //
    info.files = body.files || [];
    info.tags = body.tags || [];
    info.types = body.types || [];
    info.attachment = body.attachment || [];
    //
    info.comment_state = body.comment_state;
    info.comment_date = new Date(body.comment_date);
    return info;
  }
}
