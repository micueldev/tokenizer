import { CardEmail } from 'src/modules/card/domain/card-email';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CardEmailMother {
  static random(): CardEmail {
    return new CardEmail(this.randomValue());
  }

  static randomValue(): string {
    return this.generateEmail();
  }

  private static generateEmail() {
    const domains: Array<string> = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const randomDomain =
      domains[IntegerMother.random({ min: 0, max: domains.length - 1 })];
    return `email_${IntegerMother.random()}@${randomDomain}`;
  }
}
