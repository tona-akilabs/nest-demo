import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Post()
  create(@Body() dto: { email: string; name: string }) {
    return this.svc.create(dto.email, dto.name);
  }

  @Get()
  async list(@Query('q') q?: string, @Query('page') page = '1') {
    const [rows, total] = await this.svc.findPage(q, +page, 20);
    return { total, rows };
  }
}
