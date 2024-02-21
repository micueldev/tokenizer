import { CardCVV } from './card-cvv';
import { CardEmail } from './card-email';
import { CardExpirationMonth } from './card-expiration-month';
import { CardExpirationYear } from './card-expiration-year';
import { CardNumber } from './card-number';

export interface CardPrimitiveProps {
  email: string;
  number: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
}

export class Card {
  private email: CardEmail;
  private number: CardNumber;
  private cvv: CardCVV;
  private expirationMonth: CardExpirationMonth;
  private expirationYear: CardExpirationYear;

  constructor({
    email,
    number,
    cvv,
    expirationMonth,
    expirationYear,
  }: {
    email: CardEmail;
    number: CardNumber;
    cvv: CardCVV;
    expirationMonth: CardExpirationMonth;
    expirationYear: CardExpirationYear;
  }) {
    this.email = email;
    this.number = number;
    this.cvv = cvv;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
  }

  static create({
    email,
    number,
    cvv,
    expirationMonth,
    expirationYear,
  }: {
    email: CardEmail;
    number: CardNumber;
    cvv: CardCVV;
    expirationMonth: CardExpirationMonth;
    expirationYear: CardExpirationYear;
  }): Card {
    const card = new Card({
      email,
      number,
      cvv,
      expirationMonth,
      expirationYear,
    });
    //TODO: card created event
    return card;
  }

  static fromPrimitives({
    email,
    number,
    cvv,
    expirationMonth,
    expirationYear,
  }: CardPrimitiveProps): Card {
    return new Card({
      email: new CardEmail(email),
      number: new CardNumber(number),
      cvv: new CardCVV(cvv),
      expirationMonth: new CardExpirationMonth(expirationMonth),
      expirationYear: new CardExpirationYear(expirationYear),
    });
  }

  toPrimitives() {
    return {
      email: this.getEmail(),
      number: this.getNumber(),
      cvv: this.getCVV(),
      expirationMonth: this.getExpirationMonth(),
      expirationYear: this.getExpirationYear(),
    };
  }

  getEmail(): string {
    return this.email.value;
  }

  getNumber(): string {
    return this.number.value;
  }

  getCVV(): string {
    return this.cvv.value;
  }

  getExpirationMonth(): string {
    return this.expirationMonth.value;
  }

  getExpirationYear(): string {
    return this.expirationYear.value;
  }
}
