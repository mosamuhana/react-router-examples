import { useAsyncError } from 'react-router-dom';

export function RenderAwaitedError() {
  const error = useAsyncError() as Error;

  return (
    <p style={{ color: 'red' }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}
