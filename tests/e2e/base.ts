import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { setApplicationConfig } from 'src/config/app';
import { EmptyLogger } from 'tests/unit/shared/infrastructure/logger/empty-logger';

import Actions from './actions';
import Expects from './expects';

const getTestingApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new EmptyLogger())
    .compile();

  const app = moduleFixture.createNestApplication();
  setApplicationConfig(app);
  return app;
};

export default {
  ...Actions,
  ...Expects,
  getTestingApp,
};
