import { Validate } from '@app/core/decorators';
import { Controller, Get } from '@nestjs/common';
import { TestDto } from '../dtos/test';
import { UserService } from '../services/user';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/:id')
  getHello(@Validate<TestDto>(TestDto) all: TestDto): Promise<void> {
    return this.service.getHello(all);
  }
}
