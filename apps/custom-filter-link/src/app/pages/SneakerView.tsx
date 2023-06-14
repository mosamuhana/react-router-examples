import { useParams } from 'react-router-dom';

import { NoMatch } from './NoMatch';
import { getSneakerById } from '../sneakers';

export function SneakerView() {
  const { id } = useParams<'id'>();

  if (!id) {
    return <NoMatch />;
  }

  const sneaker = getSneakerById(id);

  if (!sneaker) {
    return <NoMatch />;
  }

  const name = `${sneaker.brand} ${sneaker.model} ${sneaker.colorway}`;

  return (
    <div>
      <h2>{name}</h2>
      <img
        width={400}
        height={400}
        style={{
          borderRadius: '8px',
          maxWidth: '100%',
          aspectRatio: '1 / 1'
        }}
        src={sneaker.imageUrl}
        alt={name}
      />
    </div>
  );
}
