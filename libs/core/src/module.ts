import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
