import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import { Layout, NoMatch } from './components';
import { delay } from './utils';
import AboutPage from './pages/AboutPage';
import HomePage, { loader as homeLoader } from './pages/HomePage';
import DashboardPage, { loader as dashboardLoader } from './pages/DashboardPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: HomePage,
      },
      {
        path: 'about',
        Component: AboutPage,
      },
      {
        path: 'dashboard',
        loader: dashboardLoader,
        Component: DashboardPage,
      },
      {
        path: 'lazy',
        lazy: () => import('./pages/LazyPage'),
      },
      {
        path: 'redirect',
        loader: redirectLoader,
      },
      {
        path: '*',
        Component: NoMatch,
      },
    ],
  },
];

async function redirectLoader() {
  await delay();
  return redirect('/');
}
