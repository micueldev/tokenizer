import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private configService: ConfigService) {
    const headerKeyApiKey = configService.get<string>('HEADER_KEY_API_KEY');
    const apiKeyValue = configService.get<string>('API_KEY');

    super(
      { header: headerKeyApiKey, prefix: '' },
      true,
      async (
        apiKey: string,
        done: (arg0: UnauthorizedException, arg1: boolean) => void,
      ) => {
        if (apiKey === apiKeyValue) {
          done(null, true);
        }
        done(new UnauthorizedException(), null);
      },
    );
  }
}
