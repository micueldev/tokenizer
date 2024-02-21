import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

import { CardService } from './card-service';

export class CardNumber extends StringValueObject {
  static readonly VALID_REGEX = /^[\d]{13,16}$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (
      !CardNumber.VALID_REGEX.test(value) ||
      !CardService.validWithLuhnAlgorithm(value)
    ) {
      throw new InvalidArgumentError(`<${value}> is not a valid card number`);
    }
  }
}
