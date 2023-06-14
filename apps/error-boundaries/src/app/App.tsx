import './App.scss';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { projectLoader } from './loaders';
import {
  Fallback,
  Layout,
  ProjectErrorBoundary,
  RootErrorBoundary,
} from './components';
import { ProjectPage } from './pages/ProjectPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: 'projects/:projectId',
            element: <ProjectPage />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader,
          },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
