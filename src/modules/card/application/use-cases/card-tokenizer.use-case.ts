import { Inject } from '@nestjs/common';

import {
  CACHE_CARD_PROVIDER_ALIAS,
  CacheCardProvider,
} from '../../domain/cache-card.provider';
import { Card } from '../../domain/card';
import { CardCVV } from '../../domain/card-cvv';
import { CardEmail } from '../../domain/card-email';
import { CardExpirationMonth } from '../../domain/card-expiration-month';
import { CardExpirationYear } from '../../domain/card-expiration-year';
import { CardNumber } from '../../domain/card-number';
import {
  TOKEN_CARD_PROVIDER_ALIAS,
  TokenCardProvider,
} from '../../domain/token-card.provider';

export class CardTokenizer {
  constructor(
    @Inject(TOKEN_CARD_PROVIDER_ALIAS)
    private readonly tokenCardProvider: TokenCardProvider,
    @Inject(CACHE_CARD_PROVIDER_ALIAS)
    private readonly cacheCardProvider: CacheCardProvider,
  ) {}

  async run(
    email: string,
    number: string,
    cvv: string,
    expirationMonth: string,
    expirationYear: string,
  ): Promise<string> {
    const card = Card.create({
      email: new CardEmail(email),
      number: new CardNumber(number),
      cvv: new CardCVV(cvv),
      expirationMonth: new CardExpirationMonth(expirationMonth),
      expirationYear: new CardExpirationYear(expirationYear),
    });

    const token = await this.tokenCardProvider.generate(card);
    await this.cacheCardProvider.set(token, card);

    return token;
  }
}
