import { Controller, Post } from '@nestjs/common';
import { ApiBasicAuth, ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Api')
@ApiBasicAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login() {
    //
  }
}
