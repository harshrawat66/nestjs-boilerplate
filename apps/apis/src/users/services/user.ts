import { Inject, Injectable } from '@nestjs/common';
import { USER_MODULE_CONST } from '../constants';
import { IUserDatabaseConnector } from '../db/interface';
import { TestDto } from '../dtos/test';

@Injectable()
export class UserService {
  constructor(@Inject(USER_MODULE_CONST.USER_CONNECTOR) private userRepo: IUserDatabaseConnector) {}
  async getHello(params: TestDto): Promise<void> {
    const user = await this.userRepo.findMany();
    console.log({ params });
    console.log({ user });
  }
}
