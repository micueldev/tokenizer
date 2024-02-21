import { CardCVV } from 'src/modules/card/domain/card-cvv';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CardCVVMother {
  static random(): CardCVV {
    return new CardCVV(this.randomValue());
  }

  static randomValue(): string {
    return `${IntegerMother.random({ min: 100, max: 9999 })}`;
  }
}
