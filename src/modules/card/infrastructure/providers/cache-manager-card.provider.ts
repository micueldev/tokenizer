import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CacheCardProvider } from '../../domain/cache-card.provider';
import { Card, CardPrimitiveProps } from '../../domain/card';

export class ManagerCacheCardProvider implements CacheCardProvider {
  private readonly TTL_MILLISECONDS = 60000;

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async set(token: string, card: Card): Promise<void> {
    await this.cache.set(token, card.toPrimitives(), this.TTL_MILLISECONDS);
  }

  async get(token: string): Promise<Card | null> {
    let card = null;
    const cardPrimitive = await this.cache.get<CardPrimitiveProps>(token);
    if (cardPrimitive) {
      card = Card.fromPrimitives(cardPrimitive);
    }
    return card;
  }
}
