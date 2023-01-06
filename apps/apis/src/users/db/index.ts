import { BaseConnector } from '@app/core/prisma/baseConnector';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserDatabaseConnector extends BaseConnector {
  constructor() {
    super();
    this.model = this.getClient('user');
  }

  findMany(): Promise<User[]> {
    return this.model.findMany();
  }
}
