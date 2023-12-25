import { UsersCreateDto, UsersSaveDto } from './dto/index.dto';
import { Injectable } from '@nestjs/common';
import { createPass } from '@libs/crypto';
import { Users } from '@mysql';

@Injectable()
export class UsersService {
  async createUser(body: UsersCreateDto) {
    const info = new Users();
    info.uid = String(await Users.getUid());
    info.name = body.name;
    info.email = body.email;
    info.avatar = body.avatar;
    info.pass = createPass(body.email, body.pass);
    return info;
  }

  handleSave(body: UsersSaveDto) {
    return { avatar: body.avatar };
  }
}
