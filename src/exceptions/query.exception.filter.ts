import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // const driverError: any = exception.driverError;

    const status = HttpStatus.BAD_REQUEST;
    const message = exception.message ?? 'Database error';

    // PostgreSQL error codes
    /*switch (driverError?.code) {
      case '23505': // unique_violation
        status = HttpStatus.CONFLICT;
        message = 'Duplicate value';
        break;

      case '23503': // foreign_key_violation
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference';
        break;
    }*/

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
