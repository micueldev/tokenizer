import { Card } from './card';

export const CACHE_CARD_PROVIDER_ALIAS = Symbol('CacheCardProvider');

export interface CacheCardProvider {
  set(token: string, card: Card): Promise<void>;

  get(token: string): Promise<Card | null>;
}
