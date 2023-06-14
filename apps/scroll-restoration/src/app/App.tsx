import './App.scss';

import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
