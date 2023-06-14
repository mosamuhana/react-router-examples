import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export function CustomLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        to={to}
        {...props}
        style={{ ...props.style, textDecoration: match ? 'underline' : 'none' }}
      >
        {children}
      </Link>
      {match && ' (active)'}
    </div>
  );
}
