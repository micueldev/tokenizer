import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/queries';
import { UseCases } from '../application/use-cases';
import { Controllers } from './controllers';
import { Providers } from './providers';

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [...UseCases, ...CommandHandlers, ...QueryHandlers, ...Providers],
})
export class CardModule {}
