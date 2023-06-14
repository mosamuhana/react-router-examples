import { useLoaderData } from 'react-router-dom';

import { rand, delay } from '../utils';

export type HomeLoaderData = {
  data: string;
};

export async function loader() {
  await delay();
  return { data: `Home loader - random value ${rand()}` } as HomeLoaderData;
}

export function Component() {
  const data = useLoaderData() as HomeLoaderData;

  return (
    <div>
      <h2>Home</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}

Component.displayName = 'HomePage';

export default Component;
