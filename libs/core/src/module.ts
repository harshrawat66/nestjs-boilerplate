import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import config from 'config';
import { PrismaConnector } from './prisma';
import { BaseConnector } from './prisma/baseConnector';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  providers: [PrismaClient, PrismaConnector, BaseConnector],
  exports: [PrismaConnector, BaseConnector],
})
export class CoreModule {}
