import { Module } from '@nestjs/common';
import { USER_MODULE_CONST } from './constants';
import { UserController } from './controllers';
import { UserDatabaseConnector } from './db';
import { UserService } from './services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, { provide: USER_MODULE_CONST.USER_CONNECTOR, useClass: UserDatabaseConnector }],
})
export class UsersModule {}
