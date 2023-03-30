import { PrismaConnector } from '@app/core/prisma';
import { Injectable } from '@nestjs/common';
import { IBaseConnector, PrismaModelActions } from '../Interfaces';

@Injectable()
export class BaseConnector<T> implements IBaseConnector<T> {
  protected client: PrismaConnector;
  protected model: PrismaModelActions<T>;
  constructor() {
    this.client = new PrismaConnector();
  }

  getClient(tableName): PrismaModelActions<T> {
    return this.client[tableName];
  }
}
