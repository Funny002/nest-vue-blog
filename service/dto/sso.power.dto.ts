/** 权限创造Dto声明 */
import { ApiProperty } from '@nestjs/swagger';
import { PowerState } from '@app/mysql';

/** 权限创建声明 */
export class SsoPowerCreateDto {
  @ApiProperty({ description: '分类' }) type: string;
  @ApiProperty({ description: '标识' }) keys: string;
  @ApiProperty({ description: '名称' }) name: string;
  @ApiProperty({ description: '互斥', required: false }) mutex: string;
  @ApiProperty({ type: 'enum', description: '状态' }) state: PowerState;
}

/** 权限修改声明 */
export class SsoPowerSaveDto extends SsoPowerCreateDto {
}
