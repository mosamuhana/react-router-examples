import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';

import { routes } from './app/routes';

hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter(x => x.route.lazy);

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (match) => {
        const routeModule = await match.route.lazy!();
        Object.assign(match.route, { ...routeModule, lazy: undefined });
      })
    );
  }

  const router = createBrowserRouter(routes);

  const rootEl = document.getElementById('app') as HTMLElement;

  hydrateRoot(
    rootEl,
    <StrictMode>
      <RouterProvider router={router} fallbackElement={null} />
    </StrictMode>
  );
}
