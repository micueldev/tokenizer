import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CardExpirationYear extends StringValueObject {
  static readonly VALID_REGEX = /^[\d]{4,4}$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (
      !CardExpirationYear.VALID_REGEX.test(value) ||
      !this.isCurrentlyValid(+value)
    ) {
      throw new InvalidArgumentError(
        `<${value}> is not a valid expiration year`,
      );
    }
  }

  private isCurrentlyValid(value: number) {
    const currentYear = new Date().getFullYear();
    return value >= currentYear && value <= currentYear + 5;
  }
}
