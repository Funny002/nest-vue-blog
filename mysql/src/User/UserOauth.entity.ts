import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@app/mysql/common';
import { Users } from '@app/mysql';

@Entity()
export class UserOauth extends BaseModel {
  @ManyToOne(() => Users, user => user.id) uid: Users;

  @Column({ /* 提供者 */ }) provider: string;

  @Column({ /* 提供者id */ }) provider_id: string;

  @Column({ /* 令牌 */ }) access_token: string;

  @Column({ /* 刷新令牌 */ }) refresh_token: string;

  @Column({ /* 超时时间 */ type: 'datetime', nullable: true }) expires_time: Date;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      provider: { name: 'provider' },
      providerId: { name: 'provider_id' },
    };
  }
}
