import { CardTokenVerifier } from 'src/modules/card/application/use-cases/card-token-verifier.use-case';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

import { MockTokenCardProvider } from '../../__mocks__/mock-token-card.provider';

describe('CardTokenVerifier UseCase', () => {
  const tokenCardProvider = new MockTokenCardProvider();
  const cardTokenVerifier = new CardTokenVerifier(tokenCardProvider);

  it('should verify a valid token', async () => {
    const token = StringMother.random();
    tokenCardProvider.returnOnValidate(true);

    const response = await cardTokenVerifier.run(token);

    expect(response).toBeTruthy();
    tokenCardProvider.assertValidateHasBeenCalledWith(token);
  });

  it('should verify a invalid', async () => {
    const token = StringMother.random();
    tokenCardProvider.returnOnValidate(false);

    const response = await cardTokenVerifier.run(token);

    expect(response).toBeFalsy();
    tokenCardProvider.assertValidateHasBeenCalledWith(token);
  });
});
