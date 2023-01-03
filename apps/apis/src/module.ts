import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { UsersModule } from './users';

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
