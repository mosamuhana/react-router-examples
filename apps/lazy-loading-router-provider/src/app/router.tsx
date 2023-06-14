import { createBrowserRouter } from 'react-router-dom';
import { Layout, NoMatch } from './components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        //element: <HomePage />,
        lazy: () => import('./pages/Home'),
      },
      {
        path: 'about',
        lazy: () => import('./pages/About'),
      },
      {
        path: 'dashboard',
        lazy: () => import('./pages/Dashboard/DashboardLayout'),
        children: [
          {
            index: true,
            lazy: () => import('./pages/Dashboard/DashboardIndex')
          },
          {
            path: 'messages',
            lazy: () => import('./pages/Dashboard/DashboardMessages')
          }
        ]
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]
  }
]);
