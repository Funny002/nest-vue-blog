import { SsoUserCreateDto } from '@app/dto/sso.user.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@app/mysql';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  
  async createUser(body: SsoUserCreateDto): Promise<User> {
    if (await User.hasKeys({ email: body.email })) {
      throw new ManualException('邮箱已存在');
    }
    
    return await this.userRepository.save(await User.of_create(body));
  }
}
