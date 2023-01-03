import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaConnector {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async getAll(model: string): Promise<User[]> {
    try {
      return this.prismaClient[model].findMany();
    } catch (e) {
      throw new HttpException(`${model} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
