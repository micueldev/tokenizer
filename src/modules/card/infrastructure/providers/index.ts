import { CACHE_CARD_PROVIDER_ALIAS } from '../../domain/cache-card.provider';
import { TOKEN_CARD_PROVIDER_ALIAS } from '../../domain/token-card.provider';
import { ManagerCacheCardProvider } from './manager-cache-card.provider';
import { JwtTokenProvider } from './jwt-token.provider';

export const Providers = [
  {
    provide: TOKEN_CARD_PROVIDER_ALIAS,
    useClass: JwtTokenProvider,
  },
  {
    provide: CACHE_CARD_PROVIDER_ALIAS,
    useClass: ManagerCacheCardProvider,
  },
];
