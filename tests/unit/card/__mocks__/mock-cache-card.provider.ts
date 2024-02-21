import { CacheCardProvider } from 'src/modules/card/domain/cache-card.provider';
import { Card } from 'src/modules/card/domain/card';

export class MockCacheCardProvider implements CacheCardProvider {
  private mockSet = jest.fn();
  private mockGet = jest.fn();

  private getReturn: Card;

  async set(token: string, card: Card): Promise<void> {
    this.mockSet(token, card);
  }

  assertSetHasBeenCalledWith(token: string, card: Card) {
    expect(this.mockSet).toHaveBeenCalledWith(token, card);
  }

  returnOnGet(card: Card) {
    this.getReturn = card;
  }

  async get(token: string): Promise<Card> {
    this.mockGet(token);
    return this.getReturn;
  }

  assertGetHasBeenCalledWith(token: string) {
    expect(this.mockGet).toHaveBeenCalledWith(token);
  }
}
