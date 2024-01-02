import { SettingCreateDto } from './dto/index.dto';
import { Injectable } from '@nestjs/common';
import { reWriteObj } from '@utils/object';
import { Setting } from '@mysql';

@Injectable()
export class SettingsService {
  create(body: SettingCreateDto) {
    const info = new Setting();
    info.keys = body.keys;
    info.type = body.type;
    info.note = body.note;
    info.value = body.value;
    if (body.state) info.state = body.state;
    if (body.power) info.power = body.power;
    return info;
  }

  handlerConfig(list: Setting[], write = true, all = false) {
    return list.reduce(function (prev: { [key: string]: any }, cur) {
      const value = write ? cur.value : all ? cur : reWriteObj(cur, ['id', 'type', 'title', 'value', 'note']);
      return Object.assign(prev, { [cur.keys]: value });
    }, {});
  }
}
