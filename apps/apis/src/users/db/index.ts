import { BaseConnector } from '@app/core/prisma/baseConnector';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserDatabaseConnector } from './interface';

@Injectable()
export class UserDatabaseConnector extends BaseConnector<User> implements IUserDatabaseConnector {
  constructor() {
    super();
    this.model = this.getClient('user');
  }

  findMany(): Promise<User[]> {
    return this.model.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.model.findFirst({ where: { id } });
  }
}
