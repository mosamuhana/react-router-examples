import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { VisuallyHidden } from '@reach/visually-hidden';

import { filterByBrand, SNEAKERS } from '../sneakers';

export function SneakerGrid() {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand');

  const sneakers = useMemo(() => {
    if (!brand) return SNEAKERS;
    return filterByBrand(brand);
  }, [brand]);

  return (
    <main>
      <h2>Sneakers</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '12px 24px'
        }}
      >
        {sneakers.map((snkr) => {
          const name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
          return (
            <div key={snkr.id} style={{ position: 'relative' }}>
              <img
                width={200}
                height={200}
                src={snkr.imageUrl}
                alt={name}
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1 / 1'
                }}
              />
              <Link
                style={{ position: 'absolute', inset: 0 }}
                to={`/sneakers/${snkr.id}`}
              >
                <VisuallyHidden>{name}</VisuallyHidden>
              </Link>
              <div>
                <p>{name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
