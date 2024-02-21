import { INestApplication } from '@nestjs/common';
import { CardMother } from 'tests/unit/card/domain/mothers/card.mother';

import base from '../base';

describe('CardController test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await base.getTestingApp();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create card token', async () => {
    const randomCard = CardMother.random();

    const res = await base.cardToken(app, {
      email: randomCard.getEmail(),
      cardNumber: randomCard.getNumber(),
      cvv: randomCard.getCVV(),
      expirationMonth: randomCard.getExpirationMonth(),
      expirationYear: randomCard.getExpirationYear(),
    });

    base.expectOkCreated(res);
    base.expectTypeJson(res);

    const body = res.body;
    expect(typeof body.token).toEqual('string');
  });

  it('should fail creating card token due to incorrect parameters', async () => {
    const res = await base.cardToken(app, {
      email: 'dfdff@fdfdf.com',
      cardNumber: '123456789012',
      cvv: '12',
      expirationMonth: '13',
      expirationYear: '111',
    });
    base.expectBadRequest(res);
    base.expectTypeJson(res);

    const body = res.body;
    expect(Array.isArray(body.message)).toBeTruthy();
    expect(body.message.length).toEqual(5);
  });

  it('should validate card token', async () => {
    const randomCard = CardMother.random();
    const response = await base.cardToken(app, {
      email: randomCard.getEmail(),
      cardNumber: randomCard.getNumber(),
      cvv: randomCard.getCVV(),
      expirationMonth: randomCard.getExpirationMonth(),
      expirationYear: randomCard.getExpirationYear(),
    });
    const token = response.body?.token;

    const res = await base.validateToken(app, token);
    base.expectOk(res);
    base.expectTypeJson(res);
    const body = res.body;
    expect(body.valid).toBeTruthy();
  });

  it('should not authorized in validate card token', async () => {
    const res = await base.validateToken(app, null);
    base.expectUnauthorized(res);
    base.expectTypeJson(res);
  });

  it('should get card data', async () => {
    const randomCard = CardMother.random();
    const response = await base.cardToken(app, {
      email: randomCard.getEmail(),
      cardNumber: randomCard.getNumber(),
      cvv: randomCard.getCVV(),
      expirationMonth: randomCard.getExpirationMonth(),
      expirationYear: randomCard.getExpirationYear(),
    });
    const token = response.body?.token;

    const res = await base.cardData(app, token);
    base.expectOk(res);
    base.expectTypeJson(res);
    const body = res.body;
    expect(body.email).toEqual(randomCard.getEmail());
    expect(body.card_number).toEqual(randomCard.getNumber());
    expect(body.expiration_month).toEqual(randomCard.getExpirationMonth());
    expect(body.expiration_year).toEqual(randomCard.getExpirationYear());
  });

  it('should not authorized in validate card token', async () => {
    const res = await base.cardData(app, null);
    base.expectUnauthorized(res);
    base.expectTypeJson(res);
  });
});
