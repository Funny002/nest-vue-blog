import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';

import { Articles, MysqlModel, Users } from '@mysql';

@Module({
  imports: [
    MysqlModel.feature(Users, Articles),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
