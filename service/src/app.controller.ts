import { Controller, Get, Req } from '@nestjs/common';
import { ResponseDto } from '@app/interceptor';

@Controller()
export class AppController {
  @Get('/getCsrfToken')
  getCsrfToken(@Req() req: Request): ResponseDto {
    return { data: req['csrfToken']() };
  }
}
