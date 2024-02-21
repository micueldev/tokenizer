import { Card } from './card';

export const TOKEN_CARD_PROVIDER_ALIAS = Symbol('TokenCardProvider');

export interface TokenCardProvider {
  generate(card: Card): Promise<string>;

  validate(token: string): Promise<boolean>;
}
