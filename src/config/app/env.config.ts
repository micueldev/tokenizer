import { Logger } from '@nestjs/common';
import { IsInt, IsNotEmpty, validateSync } from 'class-validator';

class EnvConfiguration {
  protected readonly logger = new Logger(this.constructor.name);

  @IsInt()
  readonly PORT = Number(process.env.PORT);

  @IsNotEmpty()
  readonly ENV = <string>process.env.NODE_ENV;

  @IsNotEmpty()
  readonly HEADER_KEY_API_KEY = <string>process.env.HEADER_KEY_API_KEY;

  @IsNotEmpty()
  readonly API_KEY = <string>process.env.API_KEY;

  @IsNotEmpty()
  readonly TOKEN_SECRET = <string>process.env.TOKEN_KEY;

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(
      `${this.constructor.name} validation error: ${JSON.stringify(error)}`,
    );
    process.exit(1);
  }
}

export const EnvConfig = new EnvConfiguration();
