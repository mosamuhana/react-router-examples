import { Link, useLocation } from 'react-router-dom';

import { IMAGES } from '../../images';


export function Component() {
  const location = useLocation();

  // This is the trick! Set the `backgroundLocation` in location state
  // so that when we open the modal we still see the current page in
  // the background.
  const linkState = { backgroundLocation: location };

  return (
    <div style={{ padding: '0 24px' }}>
      <h2>Gallery</h2>
      <div className="image-gallery">
        {IMAGES.map(({ id, title, src }) => (
          <Link key={id} to={`/images/${id}`} state={linkState}>
            <img src={src} alt={title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

Component.displayName = 'GalleryPage';

export default Component;
