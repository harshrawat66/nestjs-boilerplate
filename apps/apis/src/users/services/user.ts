import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { USER_MODULE_CONST } from '../constants';
import { IUserDatabaseConnector } from '../db/interface';
import { GetUserByIdDto } from '../dtos/get-user-by-id';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODULE_CONST.USER_CONNECTOR) private users: IUserDatabaseConnector) {}

  async getUsers(): Promise<User[]> {
    return this.users.findMany();
  }

  async getUserById(params: GetUserByIdDto): Promise<User> {
    return this.users.findOne(params.id);
  }
}
