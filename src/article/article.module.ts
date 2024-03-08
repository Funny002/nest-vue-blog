import { Articles, ArticlesVerify, MysqlModel, Users } from '@mysql';
import { ArticleController } from './article.controller';
import { ArticlesQueueName } from '@libs/bullQueue';
import { ArticleService } from './article.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MysqlModel.feature(Users, Articles, ArticlesVerify),
    // bull
    BullModule.registerQueue({ name: ArticlesQueueName }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
