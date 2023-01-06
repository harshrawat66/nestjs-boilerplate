import { User } from '@prisma/client';

export interface IUserDatabaseConnector {
  findMany(): Promise<User[]>;
}
