import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor() {}

  @Get()
  getAdmin() {
    return 'Admin is fetched';
  }
}
