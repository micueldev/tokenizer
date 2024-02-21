import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CardExpirationMonth extends StringValueObject {
  static readonly VALID_REGEX = /^([1-9]|1[0-2])$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!CardExpirationMonth.VALID_REGEX.test(value)) {
      throw new InvalidArgumentError(
        `<${value}> is not a valid expiration month`,
      );
    }
  }
}
