import { CardNumber } from 'src/modules/card/domain/card-number';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import {
  IntegerMother,
  WordMother,
} from 'tests/unit/shared/domain/value-object/mothers';

describe('CardNumber test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CardNumber(WordMother.random());
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardNumber(`${IntegerMother.random({ max: 999999999999 })}`);
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardNumber(
        `${IntegerMother.random({ min: 99999 })}${IntegerMother.random({ min: 99999 })}${IntegerMother.random({ min: 999999 })}`,
      );
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardNumber('1234567887654321');
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardNumber('1234123412341');
    }).toThrow(InvalidArgumentError);
  });
});
