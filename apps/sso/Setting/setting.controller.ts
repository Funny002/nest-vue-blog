import { Controller } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('setting 设置')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
}
