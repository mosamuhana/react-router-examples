import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { Layout } from './components';

import HomePage from './pages/HomePage';
import OnePage from './pages/OnePage';
import TwoPage from './pages/TwoPage';
import ThreePage from './pages/ThreePage';
import FourPage from './pages/FourPage';
import FivePage from './pages/FivePage';
import { action } from './pages/ThreePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="one" element={<OnePage />} />
      <Route path="two" element={<TwoPage />} />
      <Route path="three" action={action} element={<ThreePage />} />
      <Route path="four" element={<FourPage />} />
      <Route path="five" element={<FivePage />} />
    </Route>
  )
);
