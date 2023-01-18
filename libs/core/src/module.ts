import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import config from 'config';
import { PrismaConnector } from './prisma';
import { BaseConnector } from './prisma/baseConnector';
import { Transformer } from './transformer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  providers: [PrismaClient, PrismaConnector, BaseConnector, Transformer],
  exports: [PrismaConnector, BaseConnector, Transformer],
})
export class CoreModule {}
