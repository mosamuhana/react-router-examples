import { NavLink, NavLinkProps, Outlet, useSearchParams } from 'react-router-dom';

import { brands } from '../sneakers';
import { BrandLink } from './BrandLink';

export function Layout() {
  const [searchParams] = useSearchParams();
  const hasBrand = searchParams.has('brand');

  const allClassName: NavLinkProps['className'] =
    ({ isActive }) => isActive && !hasBrand ? 'active-link' : '';

  return (
    <div>
      <nav>
        <h3>Filter by brand</h3>

        <ul className="brand-nav">
          <li>
            <NavLink to="/" className={allClassName}>All</NavLink>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <BrandLink brand={brand}>{brand}</BrandLink>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
