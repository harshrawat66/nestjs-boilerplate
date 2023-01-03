import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import config from 'config';
import { PrismaConnector } from './prisma';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  providers: [PrismaClient, PrismaConnector],
  exports: [PrismaConnector],
})
export class CoreModule {}
