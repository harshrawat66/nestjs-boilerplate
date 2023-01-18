import { Validate } from '@app/core/decorators';
import { Transformer } from '@app/core/transformer';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetUserByIdDto } from '../dtos/get-user-by-id';
import { UserService } from '../services/user';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService, private transform: Transformer) {}

  @Get()
  async getUsers(@Res() res: Response): Promise<Response> {
    const response = await this.service.getUsers();
    return res.send(await this.transform.shapeOf(response, ['id', 'name', 'email']));
  }

  @Get('/:id')
  async getHello(@Res() res: Response, @Validate(GetUserByIdDto) inputs: GetUserByIdDto): Promise<Response> {
    const response = await this.service.getUserById(inputs);
    return res.send(await this.transform.shapeOf(response, ['id', 'name', 'email']));
  }
}
