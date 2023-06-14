import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ProjectErrorResponseData } from '../types';

export function ProjectErrorBoundary() {
  const error = useRouteError();

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }

  const { contactEmail } = error.data as ProjectErrorResponseData;

  return (
    <>
      <h1>You do not have access to this project</h1>
      <p>
        Please reach out to{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a> to obtain access.
      </p>
    </>
  );
}
