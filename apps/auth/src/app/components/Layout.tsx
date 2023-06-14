import { Outlet } from 'react-router-dom';

import { AuthStatus } from './AuthStatus';
import { Nav } from './Nav';

export function Layout() {
  return (
    <div>
      <AuthStatus />
      <Nav />
      <Outlet />
    </div>
  );
}
