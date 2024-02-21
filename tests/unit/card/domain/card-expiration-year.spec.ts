import { CardExpirationYear } from 'src/modules/card/domain/card-expiration-year';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import {
  IntegerMother,
  WordMother,
} from 'tests/unit/shared/domain/value-object/mothers';

describe('CardExpirationYear test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CardExpirationYear(WordMother.random());
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardExpirationYear(`${IntegerMother.random({ max: 999 })}`);
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardExpirationYear(`${IntegerMother.random({ min: 9999 })}`);
    }).toThrow(InvalidArgumentError);

    const currentYear = new Date().getFullYear();

    expect(() => {
      new CardExpirationYear(`${currentYear - 1}`);
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardExpirationYear(`${currentYear + 6}`);
    }).toThrow(InvalidArgumentError);
  });
});
