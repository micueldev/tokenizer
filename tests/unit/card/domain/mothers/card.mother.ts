import { Card } from 'src/modules/card/domain/card';

import { CardCVVMother } from './card-cvv.mother';
import { CardEmailMother } from './card-email.mother';
import { CardExpirationMonthMother } from './card-expiration-month.mother';
import { CardExpirationYearMother } from './card-expiration-year.mother';
import { CardNumberMother } from './card-number.mother';

export class CardMother {
  static create({
    email = CardEmailMother.randomValue(),
    number = CardNumberMother.randomValue(),
    cvv = CardCVVMother.randomValue(),
    expirationMonth = CardExpirationMonthMother.randomValue(),
    expirationYear = CardExpirationYearMother.randomValue(),
  }: {
    email?: string;
    number?: string;
    cvv?: string;
    expirationMonth?: string;
    expirationYear?: string;
  }): Card {
    return Card.fromPrimitives({
      email,
      number,
      cvv,
      expirationMonth,
      expirationYear,
    });
  }

  static random(): Card {
    return new Card({
      email: CardEmailMother.random(),
      number: CardNumberMother.random(),
      cvv: CardCVVMother.random(),
      expirationMonth: CardExpirationMonthMother.random(),
      expirationYear: CardExpirationYearMother.random(),
    });
  }
}
