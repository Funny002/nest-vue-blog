import { SsoAuthCreateDto } from '@app/dto/sso.auth.dto';
import { ManualException } from '@app/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Users } from '@app/mysql';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

  create_user(data: SsoAuthCreateDto): Users {
    const user = new Users();

    user.email = data.user;
    user.name = Date.now() + '';

    return user;
  }

  async hasCode(email: string, code: string): Promise<boolean> {
    return false;
  }

  async createUser(body: SsoAuthCreateDto): Promise<Users> {
    if (await Users.hasKeys({ email: body.user })) {
      throw new ManualException('邮箱已存在');
    }

    return await this.userRepository.save(this.create_user(body));
  }

  /**
   * =====================================================================
   * ========================================================  发送验证码
   * =====================================================================
   */
  async sendCodeEmail(req: Request, email: string) {
    return 'ok';
  }

  async sendCodePhone(req: Request, email: string) {
    throw new ManualException('功能正在开发中');
  }
}
