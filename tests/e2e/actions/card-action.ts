import { INestApplication } from '@nestjs/common';
import { Response } from 'supertest';
import { CardCVVMother } from 'tests/unit/card/domain/mothers/card-cvv.mother';
import { CardEmailMother } from 'tests/unit/card/domain/mothers/card-email.mother';
import { CardExpirationMonthMother } from 'tests/unit/card/domain/mothers/card-expiration-month.mother';
import { CardExpirationYearMother } from 'tests/unit/card/domain/mothers/card-expiration-year.mother';
import { CardNumberMother } from 'tests/unit/card/domain/mothers/card-number.mother';

import { Method, requestApi } from './base-action';

export const cardToken = (
  app: INestApplication,
  {
    email = CardEmailMother.randomValue(),
    cardNumber = CardNumberMother.randomValue(),
    cvv = CardCVVMother.randomValue(),
    expirationMonth = CardExpirationMonthMother.randomValue(),
    expirationYear = CardExpirationYearMother.randomValue(),
  }: {
    email?: string;
    cardNumber?: string;
    cvv?: string;
    expirationMonth?: string;
    expirationYear?: string;
  },
): Promise<Response> => {
  const body = {
    email,
    card_number: cardNumber,
    cvv,
    expiration_month: expirationMonth,
    expiration_year: expirationYear,
  };
  return requestApi({ app, method: Method.POST, path: '/card/token', body });
};

export const validateToken = (
  app: INestApplication,
  token: string,
): Promise<Response> => {
  const bearerToken = token ? `Bearer ${token}` : '';

  return requestApi({
    app,
    method: Method.GET,
    path: `/card/validate-token`,
    headers: { Authorization: bearerToken },
  });
};

export const cardData = (
  app: INestApplication,
  token: string,
): Promise<Response> => {
  const bearerToken = token ? `Bearer ${token}` : '';

  return requestApi({
    app,
    method: Method.GET,
    path: `/card/data`,
    headers: { Authorization: bearerToken },
  });
};
