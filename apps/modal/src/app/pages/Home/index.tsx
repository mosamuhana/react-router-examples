import { Link } from "react-router-dom";

import { IMAGES } from '../../images';

export function Component() {
  return (
    <div>
      <h2>Home</h2>

      <h3>Featured Images</h3>
      <ul>
        {IMAGES.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/images/${id}`}>{ title }</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Component.displayName = 'HomePage';

export default Component;
