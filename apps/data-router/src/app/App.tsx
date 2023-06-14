import './App.scss';

import { RouterProvider } from 'react-router-dom';

import { Fallback } from './components';
import { router } from './router';

export function App() {
  return (
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
