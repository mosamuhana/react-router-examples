import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Public Page</Link>
      </li>
      <li>
        <Link to="/protected">Protected Page</Link>
      </li>
      <li>
        <Link to="/profile">Profile Page</Link>
      </li>
    </ul>
  );
}
