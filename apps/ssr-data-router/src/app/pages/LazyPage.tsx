import { useLoaderData } from 'react-router-dom';

import { delay } from '../utils';

interface LazyPageLoaderData {
  date: string;
}

export const loader = async (): Promise<LazyPageLoaderData> => {
  await delay(500);
  return {
    date: new Date().toISOString(),
  };
};

export function Component() {
  const data = useLoaderData() as LazyPageLoaderData;

  return (
    <>
      <h2>Lazy Route</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}

Component.displayName = 'LazyPage';

export default Component;
