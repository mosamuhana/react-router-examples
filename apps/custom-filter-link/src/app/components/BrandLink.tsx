import { Link, NavLink, LinkProps, useSearchParams } from 'react-router-dom';

type Props = Omit<LinkProps, 'to'> & { brand: string };

export function BrandLink({ brand, children, ...props }: Props) {
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get('brand') === brand;

  return (
    <Link
      to={`/?brand=${brand}`}
      {...props}
      className={ isActive ? 'active-link' : '' }
    >
      {children}
    </Link>
  );
}

export function BrandNavLink({ brand, children, ...props }: Props) {
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get('brand') === brand;

  return (
    <NavLink
      to={`/?brand=${brand}`}
      {...props}
      className={ isActive ? 'active-link' : '' }
    >
      {children}
    </NavLink>
  );
}
