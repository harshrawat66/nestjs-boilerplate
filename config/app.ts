import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.NEST_NAME || 'nestjs monorepo',
  env: process.env.NEST_ENV || 'local',
  debug: +process.env.NEST_DEBUG || 1,
  port: process.env.DATABASE_PORT || 6000,
  url: process.env.NEST_URL || 'http://localhost:6000',
}));
