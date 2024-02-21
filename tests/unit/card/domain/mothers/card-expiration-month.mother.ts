import { CardExpirationMonth } from 'src/modules/card/domain/card-expiration-month';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CardExpirationMonthMother {
  static random(): CardExpirationMonth {
    return new CardExpirationMonth(this.randomValue());
  }

  static randomValue(): string {
    return `${IntegerMother.random({ min: 1, max: 12 })}`;
  }
}
