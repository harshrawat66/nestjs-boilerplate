import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/users/controllers/user';
import { UserService } from '../../src/users/services/user';

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello({})).toBe('Hello World!');
    });
  });
});
