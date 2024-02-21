import { CardFinder } from 'src/modules/card/application/use-cases/card-finder.use-case';
import { CardNotFoundError } from 'src/modules/card/domain/transaction-not-found.error';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

import { MockCacheCardProvider } from '../../__mocks__/mock-cache-card.provider';
import { CardMother } from '../../domain/mothers/card.mother';

describe('CardFinder UseCase', () => {
  const cacheCardProvider = new MockCacheCardProvider();
  const cardFinder = new CardFinder(cacheCardProvider);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the card', async () => {
    const card = CardMother.random();
    cacheCardProvider.returnOnGet(card);

    const token = StringMother.random();
    const response = await cardFinder.run(token);

    expect(response).toEqual(card);
    cacheCardProvider.assertGetHasBeenCalledWith(token);
  });

  it('should throw a not found error', async () => {
    cacheCardProvider.returnOnGet(null);

    const token = StringMother.random();
    await expect(cardFinder.run(token)).rejects.toThrow(CardNotFoundError);
    cacheCardProvider.assertGetHasBeenCalledWith(token);
  });
});
