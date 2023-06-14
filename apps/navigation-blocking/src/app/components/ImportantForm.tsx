import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useBlocker } from "../utils/unstable_router";

import { ConfirmNavigation } from "./ConfirmNavigation";

export function ImportantForm() {
  const [value, setValue] = useState('');
  const isBlocked = value !== '';
  const blocker = useBlocker(isBlocked);

  // Reset the blocker if the user cleans the form
  useEffect(() => {
    if (blocker.state === 'blocked' && !isBlocked) {
      blocker.reset();
    }
  }, [blocker, isBlocked]);

  return (
    <>
      <p>
        Is the form dirty?{' '}
        {isBlocked ? (
          <span style={{ color: 'red' }}>Yes</span>
        ) : (
          <span style={{ color: 'green' }}>No</span>
        )}
      </p>

      <Form method="post">
        <label>
          Enter some important data:
          <input name="data" value={value} onChange={e => setValue(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </Form>

      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
    </>
  );
}
