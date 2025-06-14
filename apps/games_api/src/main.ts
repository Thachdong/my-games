import 'reflect-metadata';
import { BadRequestException, ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EConfigKeys } from 'common/constants';
import { IoAdapter } from '@nestjs/platform-socket.io';

const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
      const messages = errors
        .map((err) => Object.values(err.constraints))
        .flat();

      return new BadRequestException(messages);
    },
  });

  app.useGlobalPipes(validationPipe);

  // Global interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

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

  // Use Socket.IO adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  const port = process.env[EConfigKeys.PORT] || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
