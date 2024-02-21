import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CardCVV extends StringValueObject {
  static readonly VALID_REGEX = /^[\d]{3,4}$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!CardCVV.VALID_REGEX.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid CVV`);
    }
  }
}
