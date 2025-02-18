import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  ping() {
    return 'Backend está respondendo!';
  }
}
