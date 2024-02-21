import { CacheModule } from '@nestjs/cache-manager';

export const CacheTestingModule = () => [
  CacheModule.register({
    ttl: 0,
  }),
];
