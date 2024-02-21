import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CardOutput } from '../dtos/card.output';
import { CardFinder } from '../use-cases/card-finder.use-case';
import { GetCardQuery } from './get-card.query';

@QueryHandler(GetCardQuery)
export class GetTransactionQueryHandler implements IQueryHandler<GetCardQuery> {
  constructor(private cardFinder: CardFinder) {}

  async execute(query: GetCardQuery): Promise<CardOutput> {
    const card = await this.cardFinder.run(query.getToken());
    return {
      email: card.getEmail(),
      number: card.getNumber(),
      expirationMonth: card.getExpirationMonth(),
      expirationYear: card.getExpirationYear(),
    };
  }
}
