import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setApplicationConfig } from './config/app';
import { EnvConfig } from './config/app/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setApplicationConfig(app);
  await app.listen(EnvConfig.PORT);
  Logger.log(`Server running on port ${EnvConfig.PORT}`, 'Bootstrap');
}
bootstrap();
