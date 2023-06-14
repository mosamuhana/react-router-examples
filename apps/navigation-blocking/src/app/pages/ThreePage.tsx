import { json } from 'react-router-dom';

import { ImportantForm } from '../components';

export const action = () => json({ ok: true });

export function Component() {
  return (
    <>
      <h2>Three</h2>
      <ImportantForm />
    </>
  );
}

Component.displayName = 'ThreePage';

export default Component;
