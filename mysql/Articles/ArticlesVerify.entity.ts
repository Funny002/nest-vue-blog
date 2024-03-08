import { Column, Entity, In } from 'typeorm';
import { BaseModel } from '../Common';

export enum ArticleVerifyState {
  PASS = 'pass',  // 通过
  ERROR = 'error', // 错误
  VERIFY = 'verify', // 审核
  NOT_PASS = 'not_pass',  // 未通过
}

@Entity()
export class ArticlesVerify extends BaseModel {
  @Column({ /* pid */ }) pid: number;

  @Column({ /* 审核备注 */ }) verify_remark: string;

  @Column({ /* 审核时间 */ type: 'datetime' }) verify_date: Date;

  @Column({ /* 审核状态 */ type: 'enum', enum: ArticleVerifyState, default: ArticleVerifyState.VERIFY }) verify_state: ArticleVerifyState;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {};
  }
}
