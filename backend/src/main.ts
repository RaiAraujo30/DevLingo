import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  expressApp.use(express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}

bootstrap();
