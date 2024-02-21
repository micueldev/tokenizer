import { CardEmail } from 'src/modules/card/domain/card-email';
import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { WordMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('CardEmail test', () => {
  it('should throw an error for invalid value', () => {
    expect(() => {
      new CardEmail(WordMother.random());
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardEmail('email:email@gmail.com');
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardEmail('email@gmail.es');
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardEmail('user_2@hotmail.es');
    }).toThrow(InvalidArgumentError);

    expect(() => {
      new CardEmail('unknown@yahoo.com');
    }).toThrow(InvalidArgumentError);
  });
});
