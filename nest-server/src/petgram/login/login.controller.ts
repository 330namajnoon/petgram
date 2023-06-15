import { Controller, Post, Get } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Post()
  login(): string {
    return 'login';
  }

  @Get()
  loginget(): string {
    return 'login';
  }
}
