import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ForbiddenException } from './exceptions/forbidden.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    throw new ForbiddenException();
  }

  @Get('orders')
  getOrderStatus(@Query('status') status?: string): string {
    return this.appService.getOrderStatus(status);
  }
}
