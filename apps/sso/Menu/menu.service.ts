import { SsoMenuCreateDto } from '@app/dto/sso.menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menu } from '@app/mysql';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>) {}

  async verify(body: SsoMenuCreateDto) {
    // has parent
    if (body.parent && !(await Menu.hasKeys({ id: body.parent }))) {
      return { status: false, message: '父级不存在' };
    }
    // has keys or name
    const { parent, name, keys } = body;
    if (await Menu.hasKeys({ id: parent, name, keys })) {
      return { status: false, message: '已存在' };
    }
    //
    return { status: true };
  }

  async createMenu(body: SsoMenuCreateDto) {
    return await this.menuRepository.save(await Menu.of_create(body));
  }
}
