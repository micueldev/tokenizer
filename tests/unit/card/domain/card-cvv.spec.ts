import { CardCVV } from 'src/modules/card/domain/card-cvv';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import {
  IntegerMother,
  WordMother,
} from 'tests/unit/shared/domain/value-object/mothers';

describe('CardCVV test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CardCVV(WordMother.random());
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardCVV(`${IntegerMother.random({ max: 99 })}`);
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardCVV(`${IntegerMother.random({ min: 9999 })}`);
    }).toThrow(InvalidArgumentError);
  });
});
