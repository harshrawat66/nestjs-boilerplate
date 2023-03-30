import { PrismaModelActions } from './common';

export interface IBaseConnector<T> {
  getClient(tableName: string): PrismaModelActions<T>;
}
