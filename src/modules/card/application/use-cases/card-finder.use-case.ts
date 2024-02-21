import { Inject } from '@nestjs/common';

import {
  CACHE_CARD_PROVIDER_ALIAS,
  CacheCardProvider,
} from '../../domain/cache-card.provider';
import { Card } from '../../domain/card';
import { CardNotFoundError } from '../../domain/transaction-not-found.error';

export class CardFinder {
  constructor(
    @Inject(CACHE_CARD_PROVIDER_ALIAS)
    private readonly cacheCardProvider: CacheCardProvider,
  ) {}

  async run(token: string): Promise<Card> {
    const card = await this.cacheCardProvider.get(token);

    if (!card) {
      throw new CardNotFoundError();
    }

    return card;
  }
}
