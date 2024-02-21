import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ApiKeyStrategy } from './strategies/apikey.strategy';

@Module({
  imports: [PassportModule],
  providers: [ApiKeyStrategy],
})
export class SharedModule {}
