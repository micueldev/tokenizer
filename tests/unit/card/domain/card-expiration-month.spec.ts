import { CardExpirationMonth } from 'src/modules/card/domain/card-expiration-month';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import {
  IntegerMother,
  WordMother,
} from 'tests/unit/shared/domain/value-object/mothers';

describe('CardExpirationMonth test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CardExpirationMonth(WordMother.random());
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardExpirationMonth('0');
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardExpirationMonth(`${IntegerMother.random({ min: 13 })}`);
    }).toThrow(InvalidArgumentError);
  });
});
