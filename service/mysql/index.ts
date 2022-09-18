import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键' }) id: number;
  
  @CreateDateColumn({ type: 'datetime', comment: '创建时间', nullable: true }) create_time: Date;
  
  @UpdateDateColumn({ type: 'datetime', comment: '更新时间', nullable: true }) update_time: Date;
}

// User
export * from './src/User/User.entity';
export * from './src/User/UserOauth.entity';
// Permission
export * from './src/Permission/Power.entity';
export * from './src/Permission/PowerRole.entity';
export * from './src/Permission/PowerExtend.entity';
