/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EConfigKeys } from 'common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS
  app.enableCors();

  // Enable validation
  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors,
    }),
  });
  app.useGlobalPipes(validationPipe);

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Vietnamese Gomoku API')
    .setDescription(
      'API documentation for Vietnamese Gomoku (five in a row, caro) game'
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup([globalPrefix, 'docs'].join('/'), app, document);

  const port = process.env[EConfigKeys.PORT] || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
