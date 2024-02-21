import { ObjectNotFoundError } from 'src/modules/shared/domain/errors';

export class TestNotFoundError extends ObjectNotFoundError {
  protected objectName: 'Test';
}
