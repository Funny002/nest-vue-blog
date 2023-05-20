import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { SsoRoleCreateDto } from '@app/dto/sso.role.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '@app/mysql';

@Injectable()
export class RoleService {}
