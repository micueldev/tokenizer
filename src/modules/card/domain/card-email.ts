import { InvalidArgumentError } from 'src/modules/shared/domain/errors';
import { StringValueObject } from 'src/modules/shared/domain/value-object/string-value-object';

export class CardEmail extends StringValueObject {
  static readonly VALID_REGEX =
    /^[a-zA-Z0-9._-]+@((gmail|hotmail)\.com|yahoo\.es)$/;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    if (!CardEmail.VALID_REGEX.test(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid email`);
    }
  }
}
