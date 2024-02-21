import { CardExpirationYear } from 'src/modules/card/domain/card-expiration-year';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CardExpirationYearMother {
  static random(): CardExpirationYear {
    return new CardExpirationYear(this.randomValue());
  }

  static randomValue(): string {
    const currentYear = new Date().getFullYear();
    return `${IntegerMother.random({ min: currentYear, max: currentYear + 5 })}`;
  }
}
