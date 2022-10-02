import { Body, Controller, Post, Req } from '@nestjs/common';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Request } from 'express';

@ApiTags('Role 角色权限')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }
  
  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  async createRole(@Req() req: Request, @Body() body: SsoRoleCreateDto) {
    return await this.roleService.addRole(body)
    // return (await this.roleService.addRole(body)).id;
  }
}
