import { Card } from 'src/modules/card/domain/card';

import { CardMother } from './mothers/card.mother';
import { CardCVVMother } from './mothers/card-cvv.mother';
import { CardEmailMother } from './mothers/card-email.mother';
import { CardExpirationMonthMother } from './mothers/card-expiration-month.mother';
import { CardExpirationYearMother } from './mothers/card-expiration-year.mother';
import { CardNumberMother } from './mothers/card-number.mother';

describe('Card test', () => {
  it('should be instantiated correctly', () => {
    const cardObject = {
      email: CardEmailMother.randomValue(),
      number: CardNumberMother.randomValue(),
      cvv: CardCVVMother.randomValue(),
      expirationMonth: CardExpirationMonthMother.randomValue(),
      expirationYear: CardExpirationYearMother.randomValue(),
    };

    expect(Card.fromPrimitives({ ...cardObject }).toPrimitives()).toEqual(
      cardObject,
    );
  });

  it('should correctly return the values', () => {
    const email = CardEmailMother.randomValue();
    const number = CardNumberMother.randomValue();
    const cvv = CardCVVMother.randomValue();
    const expirationMonth = CardExpirationMonthMother.randomValue();
    const expirationYear = CardExpirationYearMother.randomValue();

    const card = CardMother.create({
      email,
      number,
      cvv,
      expirationMonth,
      expirationYear,
    });

    expect(card.getEmail()).toEqual(email);
    expect(card.getNumber()).toEqual(number);
    expect(card.getCVV()).toEqual(cvv);
    expect(card.getExpirationMonth()).toEqual(expirationMonth);
    expect(card.getExpirationYear()).toEqual(expirationYear);
  });
});
