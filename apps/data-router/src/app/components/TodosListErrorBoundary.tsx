import { useRouteError } from "react-router-dom";

export function TodosListErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <>
      <h2>
        Error{' '}
        <span role="img" aria-label="Fire">💥</span>
      </h2>
      <p>{error.message}</p>
    </>
  );
}
