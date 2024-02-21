import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { CardTokenVerifier } from '../use-cases/card-token-verifier.use-case';
import { VerifyTokenQuery } from './verify-token.query';

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenQueryHandler
  implements IQueryHandler<VerifyTokenQuery>
{
  constructor(private cardTokenVerifier: CardTokenVerifier) {}

  async execute(query: VerifyTokenQuery): Promise<boolean> {
    return this.cardTokenVerifier.run(query.getToken());
  }
}
