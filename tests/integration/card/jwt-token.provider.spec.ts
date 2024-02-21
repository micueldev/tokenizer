import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenProvider as TokenProvider } from 'src/modules/card/infrastructure/providers/jwt-token.provider';
import { CardMother } from 'tests/unit/card/domain/mothers/card.mother';
import { StringMother } from 'tests/unit/shared/domain/value-object/mothers';

describe('JwtTokenProvider test', () => {
  let testingModule: TestingModule;
  let tokenProvider: TokenProvider;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [TokenProvider],
    }).compile();
    tokenProvider = testingModule.get(TokenProvider);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should not validate a invalid token', async () => {
    const token = StringMother.random();
    const response = await tokenProvider.validate(token);
    expect(response).toBeFalsy();
  });

  it('should validate a valid token', async () => {
    const card = CardMother.random();

    const token = await tokenProvider.generate(card);
    const response = await tokenProvider.validate(token);
    expect(response).toBeTruthy();
  });
});
