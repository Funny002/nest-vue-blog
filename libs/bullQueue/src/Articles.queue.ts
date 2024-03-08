import { Articles, ArticleState, ArticlesVerify, ArticleVerifyState } from '@mysql';
import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { LoggerService } from '@libs/logger';
import { Job } from 'bull';

export const ArticlesQueueName = 'articles_queue_name';

@Processor(ArticlesQueueName)
export class ArticlesQueueServer {
  private readonly logger = new LoggerService(ArticlesQueueServer.name);

  @Process('handler')
  async transcode(job: Job<{ id: number; result: any }>) {
    const id = job.data.id;
    this.logger.log(`queueId: ${ job.id }, queueName: ${ job.name }, articlesId: ${ id }`);
    const article = await Articles.getInfoKeys({ id });
    //
    await this.handlerArticleTitle(article.title);
    await this.handlerArticleContent(article.content);
    //
    const info = this.createInfo(id, ArticleVerifyState.PASS, '系统处理');
    job.data.result = true;
    // 其他处理逻辑
    return (await ArticlesVerify.save(info)).id;
  }

  // 创建信息
  createInfo(id: number, state: ArticleVerifyState, remark: string) {
    const data = new ArticlesVerify();
    data.pid = id;
    data.verify_state = state;
    data.verify_remark = remark;
    data.verify_date = new Date();
    return data;
  }

  // 标题处理
  async handlerArticleTitle(title: string) {
    console.log('handlerArticleTitle', title);
  }

  // 内容处理
  async handlerArticleContent(content: string) {
    console.log('handlerArticleContent', content);
  }

  // 成功
  @OnQueueCompleted({ name: 'handler' })
  async completed(job: Job<{ id: number }>, result: number) {
    console.log(job.data);
    const id = job.data.id;
    await Articles.update({ id }, { state: ArticleState.PASS });
    this.logger.log(`type: completed, queueName: ${ job.name }, queueId: ${ job.id }, ArticleId: ${ id }, ArticlesVerifyId: ${ result }`);
  }

  // 错误
  @OnQueueFailed({ name: 'handler' })
  async failed(job: Job, error: Error) {
    const id = job.data.id;
    await Articles.update({ id }, { state: ArticleState.ERROR });
    this.logger.log(`type: failed, queueName: ${ job.name }, queueId: ${ job.id }, ArticleId: ${ id }, error: ${ error.message }`);
  }
}
