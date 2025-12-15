import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryExceptionFilter } from './exceptions/query.exception.filter';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new QueryExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
