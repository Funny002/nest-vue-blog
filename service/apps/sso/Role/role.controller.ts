import { Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role 角色权限')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }
}
