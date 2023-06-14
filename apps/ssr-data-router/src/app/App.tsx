import './App.scss';

import { useRoutes } from 'react-router-dom';

import { routes as _routes } from './routes';

export const routes = _routes;

export default function App() {
  const element = useRoutes(routes);

  return (<main>{element}</main>);
}
