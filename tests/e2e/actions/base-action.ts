import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { Request, Response } from 'supertest';

export enum Method {
  GET = 'get',
  POST = 'post',
}

export const requestApi = ({
  app,
  method,
  path,
  body,
  headers = {},
}: {
  app: INestApplication;
  method: Method;
  path: string;
  body?: any;
  headers?: Record<string, string>;
}): Promise<Response> => {
  const config = app.get(ConfigService);
  const keyApiKey = config.get<string>('HEADER_KEY_API_KEY');
  const apiKey = config.get<string>('API_KEY');

  const apiPath = `/api${path}`;
  const httpApp = request(app.getHttpServer());

  let _request: Request;
  if (method === Method.POST) {
    _request = httpApp.post(apiPath).send(body);
  } else {
    _request = httpApp.get(apiPath);
  }
  headers[keyApiKey] = apiKey;
  _request.set(headers);

  return _request;
};
