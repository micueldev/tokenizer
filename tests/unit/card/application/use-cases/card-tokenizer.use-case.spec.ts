import { CardTokenizer } from 'src/modules/card/application/use-cases/card-tokenizer.use-case';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

import { MockCacheCardProvider } from '../../__mocks__/mock-cache-card.provider';
import { MockTokenCardProvider } from '../../__mocks__/mock-token-card.provider';
import { CardMother } from '../../domain/mothers/card.mother';

describe('CardTokenizer UseCase', () => {
  const tokenCardProvider = new MockTokenCardProvider();
  const cacheCardProvider = new MockCacheCardProvider();
  const cardTokenizer = new CardTokenizer(tokenCardProvider, cacheCardProvider);

  it('should tokenize the card', async () => {
    const card = CardMother.random();

    const token = StringMother.random();
    tokenCardProvider.returnOnGenerate(token);

    const response = await cardTokenizer.run(
      card.getEmail(),
      card.getNumber(),
      card.getCVV(),
      card.getExpirationMonth(),
      card.getExpirationYear(),
    );

    expect(response).toEqual(token);
    tokenCardProvider.assertGenerateHasBeenCalledWith(card);
    cacheCardProvider.assertSetHasBeenCalledWith(token, card);
  });
});
