import { Injectable } from '@nestjs/common';
import { TestDto } from '../dtos/test';

@Injectable()
export class UserService {
  async getHello(params: TestDto): Promise<void> {
    console.log(params);
    // await new Promise((r) => setTimeout(r, 2000));
  }
}
