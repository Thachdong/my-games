/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EConfigKeys } from 'common/constants';
import * as fs from 'fs';
import * as path from 'path';

const cookieParser = require('cookie-parser')

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/server.cert')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable CORS
  app.enableCors();

  app.use(cookieParser());

  // Enable validation
  const validationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(err => Object.values(err.constraints)).flat();

      return new BadRequestException(messages);
    },
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
