import { Inject } from '@nestjs/common';

import {
  TOKEN_CARD_PROVIDER_ALIAS,
  TokenCardProvider,
} from '../../domain/token-card.provider';

export class CardTokenVerifier {
  constructor(
    @Inject(TOKEN_CARD_PROVIDER_ALIAS)
    private readonly tokenCardProvider: TokenCardProvider,
  ) {}

  async run(token: string): Promise<boolean> {
    return this.tokenCardProvider.validate(token);
  }
}
