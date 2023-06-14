import type { RouteObject } from 'react-router-dom';

import { Layout, NoMatch } from './components';
import HomePage from './pages/Home';
import { coursesRoute } from './pages/Courses';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      coursesRoute,
      { path: '*', element: <NoMatch /> }
    ]
  }
];
