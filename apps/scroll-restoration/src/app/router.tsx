import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { LongPage, loader as getArrayLoader } from './pages/LongPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h2>Home</h2>
      },
      {
        path: 'restore-by-key',
        loader: getArrayLoader,
        element: <LongPage />
      },
      {
        path: 'restore-by-pathname',
        loader: getArrayLoader,
        element: <LongPage />,
        handle: { scrollMode: 'pathname' }
      },
      {
        path: 'link-to-hash',
        loader: getArrayLoader,
        element: <LongPage />
      }
    ]
  }
]);
