import { useRouteError } from 'react-router-dom';

export function RootErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div>
      <h1>
        Uh oh, something went terribly wrong{' '}
        <span role="img" aria-label="terribly">😩</span>
      </h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>
        Click here to reload the app
      </button>
    </div>
  );
}
