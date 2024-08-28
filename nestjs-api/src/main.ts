import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found.exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }));
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
