import { Injectable } from '@nestjs/common';
import { UsersSaveDto } from './dto/index.dto';

@Injectable()
export class UsersService {
  handleSave(body: UsersSaveDto) {
    return { avatar: body.avatar };
  }
}
