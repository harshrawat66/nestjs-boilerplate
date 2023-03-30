import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { TimeoutInterceptor } from '@app/core/intercepters';
import { ValidationPipe } from '@nestjs/common';
import { Cluster } from './cluster';
import { PrismaConnector } from '@app/core/prisma';
import { ExceptionFilter } from '@app/core/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // validation container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // body parser configuration
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // helmet configuration for headers
  app.use(helmet());

  // rate limiter configuration
  app.use(rateLimit({ windowMs: 60, max: 60 }));

  // cross-origin-resource-sharing configuration
  app.enableCors();

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      stopAtFirstError: true,
      transformOptions: { excludeExtraneousValues: true },
    }),
  );

  // filters
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  // timeout intercepter configuration
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // prisma shutdown hook configuration
  const prismaConnector = app.get(PrismaConnector);
  await prismaConnector.enableShutdownHooks(app);

  // get port from config
  const config = app.get(ConfigService);
  await app.listen(config.get('app.port'));
}

Cluster.register(bootstrap);
