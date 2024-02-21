import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { ManagerCacheCardProvider as CacheCardProvider } from 'src/modules/card/infrastructure/providers/manager-cache-card.provider';
import { CardMother } from 'tests/unit/card/domain/mothers/card.mother';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

import { CacheTestingModule } from '../base';

describe('CacheManagerProvider test', () => {
  let testingModule: TestingModule;
  let cache: Cache;
  let cacheCardProvider: CacheCardProvider;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [...CacheTestingModule()],
      providers: [CacheCardProvider],
    }).compile();
    cache = testingModule.get<Cache>(CACHE_MANAGER);
    cacheCardProvider = testingModule.get(CacheCardProvider);
  });

  beforeEach(async () => {
    await cache.reset();
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should return null because it does not exist', async () => {
    const card = await cacheCardProvider.get(StringMother.random());
    expect(card).toBeNull();
  });

  it('should return existing data', async () => {
    const card = CardMother.random();
    const token = StringMother.random();

    let storedCard = await cacheCardProvider.get(token);
    expect(storedCard).toBeNull();

    await cacheCardProvider.set(token, card);
    storedCard = await cacheCardProvider.get(token);
    expect(storedCard).toEqual(card);
  });
});
