import { PrismaConnector } from '@app/core/prisma';
import { Injectable } from '@nestjs/common';
import { TestDto } from '../dtos/test';

@Injectable()
export class UserService {
  constructor(private prismaClient: PrismaConnector) {}
  async getHello(params: TestDto): Promise<void> {
    console.log(await this.prismaClient.user.findMany());
    // await new Promise((r) => setTimeout(r, 2000));
  }
}
