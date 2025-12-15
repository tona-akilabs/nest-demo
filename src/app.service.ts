import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getOrderStatus(status?: string) {
    if (status === 'success') {
      return 'Order Complete!';
    }
    if (status === 'failed') {
      return 'Order Failed!';
    }
    throw new BadRequestException('Unknown status: ' + status);
  }
}
