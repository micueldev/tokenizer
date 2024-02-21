import { CardNumber } from 'src/modules/card/domain/card-number';
import { IntegerMother } from 'tests/unit/shared/domain/value-object/mothers';

export class CardNumberMother {
  static random(): CardNumber {
    return new CardNumber(this.randomValue());
  }

  static randomValue(): string {
    return this.generateCardNumber(IntegerMother.random({ min: 13, max: 16 }));
  }

  private static generateCardNumber(length: number) {
    let result = '';
    for (let i = 0; i < length - 1; i++) {
      result += Math.floor(Math.random() * 10);
    }

    let sum = 0;
    let odd = true;
    for (let j = result.length - 1; j >= 0; j--) {
      let digit = parseInt(result[j], 10);
      if (odd) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      odd = !odd;
    }

    const checksumDigit = (10 - (sum % 10)) % 10;
    result += checksumDigit;
    return result;
  }
}
