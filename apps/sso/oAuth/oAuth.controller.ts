import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('oAuth')
@Controller('oAuth')
export class oAuthController {
  // google
  @Get('google/callback')
  async googleCallback() {}

  @Get('google')
  async googleLogin() {}

  // github
  @Get('github/callback')
  async githubCallback() {}

  @Get('github')
  async githubLogin() {}

  // qq
  @Get('qq/callback')
  async qqCallback() {}

  @Get('qq')
  async qqLogin() {}
}
