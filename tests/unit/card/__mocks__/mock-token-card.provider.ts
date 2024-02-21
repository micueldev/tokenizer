import { Card } from 'src/modules/card/domain/card';
import { TokenCardProvider } from 'src/modules/card/domain/token-card.provider';

export class MockTokenCardProvider implements TokenCardProvider {
  private mockGenerate = jest.fn();
  private mockValidate = jest.fn();

  private generateReturn: string;
  private validateReturn: boolean;

  returnOnGenerate(token: string) {
    this.generateReturn = token;
  }

  async generate(card: Card): Promise<string> {
    this.mockGenerate(card);
    return this.generateReturn;
  }

  assertGenerateHasBeenCalledWith(card: Card) {
    expect(this.mockGenerate).toHaveBeenCalledWith(card);
  }

  returnOnValidate(isValid: boolean) {
    this.validateReturn = isValid;
  }

  async validate(token: string): Promise<boolean> {
    this.mockValidate(token);
    return this.validateReturn;
  }

  assertValidateHasBeenCalledWith(token: string) {
    expect(this.mockValidate).toHaveBeenCalledWith(token);
  }
}
