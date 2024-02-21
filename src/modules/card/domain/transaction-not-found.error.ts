import { ObjectNotFoundError } from 'src/modules/shared/domain/errors';

export class CardNotFoundError extends ObjectNotFoundError {
  protected readonly objectName = 'Card';
}
