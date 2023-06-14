import { useLoaderData } from 'react-router-dom';

import { rand, delay } from '../utils';

export type DashboardLoaderData = {
  data: string;
};

export async function loader() {
  await delay();
  return { data: `Dashboard loader - random value ${rand()}` } as DashboardLoaderData;
}

export function Component() {
  const data = useLoaderData() as DashboardLoaderData;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}

Component.displayName = 'DashboardPage';

export default Component;
