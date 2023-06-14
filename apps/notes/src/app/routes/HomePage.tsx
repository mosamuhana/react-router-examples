import { useLoaderData, Link, Outlet } from 'react-router-dom';

import { getNotes } from '../notes';
import { Note } from '../types';

export async function loader() {
  return getNotes();
}

export function Component() {
  const notes = useLoaderData() as Note[];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ padding: '0 2rem', borderRight: 'solid 1px #ccc' }}>
        <h1>Notes!</h1>
        <p>
          <Link to="new">Create Note</Link>
        </p>
        <ul>
          {notes.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/note/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1, padding: '0 2rem' }}>
        <Outlet />
      </div>
    </div>
  );
}

Component.displayName = 'HomePage';

export default Component;
