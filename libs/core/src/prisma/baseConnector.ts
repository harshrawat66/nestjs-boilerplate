import { PrismaConnector } from '@app/core/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IBaseConnector } from '../Interfaces';

@Injectable()
export class BaseConnector implements IBaseConnector {
  protected client: PrismaConnector;
  protected model;
  constructor() {
    this.client = new PrismaConnector();
  }

  getClient(tableName): Promise<Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>> {
    return this.client[tableName];
  }
}
