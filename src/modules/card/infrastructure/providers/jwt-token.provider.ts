import { sign, verify } from 'jsonwebtoken';

import { Card } from '../../domain/card';
import { TokenCardProvider } from '../../domain/token-card.provider';

export class JwtTokenProvider implements TokenCardProvider {
  private readonly KEY = 'key';

  async generate(card: Card): Promise<string> {
    return sign({ email: card.getEmail() }, this.KEY, {
      expiresIn: '1m',
    });
  }
  async validate(token: string): Promise<boolean> {
    let isValid = false;
    try {
      verify(token, this.KEY);
      isValid = true;
    } catch (err) {
      // silent passs
    } finally {
      return isValid;
    }
  }
}
