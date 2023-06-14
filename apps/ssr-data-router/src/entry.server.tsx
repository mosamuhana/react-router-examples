import type { Request as ExpressRequest } from 'express';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { routes } from './app/routes';
import { copyRequestheaders, getUrl } from './urils';

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(req);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  return renderToString(
    <StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </StrictMode>
  );
}

export function createFetchRequest(req: ExpressRequest): Request {
  const { method, body, headers } = req;

  const url = getUrl(req);
  const controller = new AbortController();

  req.on('close', () => controller.abort());

  const init: RequestInit = {
    method: method,
    headers: copyRequestheaders(headers),
    signal: controller.signal,
    body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
  };

  return new Request(url, init);
}
