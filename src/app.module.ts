import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { CardModule } from './modules/card/infrastructure/card.module';
import { SharedModule } from './modules/shared/infrastructure/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    SharedModule,
    CardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
