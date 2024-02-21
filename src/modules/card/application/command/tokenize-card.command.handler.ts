import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CardTokenizer } from '../use-cases/card-tokenizer.use-case';
import { TokenizeCardCommand } from './tokenize-card.command';

@CommandHandler(TokenizeCardCommand)
export class TokenizeCardCommandHandler
  implements ICommandHandler<TokenizeCardCommand>
{
  constructor(private cardTokenizer: CardTokenizer) {}

  async execute(command: TokenizeCardCommand): Promise<string> {
    const token = await this.cardTokenizer.run(
      command.getEmail(),
      command.getNumber(),
      command.getCVV(),
      command.getExpirationMonth(),
      command.getExpirationYear(),
    );

    return token;
  }
}
