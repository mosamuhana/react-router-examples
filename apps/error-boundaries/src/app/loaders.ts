import type { LoaderFunctionArgs } from 'react-router-dom';
import { json } from 'react-router-dom';

import { Project, ProjectErrorResponseData } from './types';

export function projectLoader({ params }: LoaderFunctionArgs) {
  const projectId = params.projectId!;
  if (projectId === 'unauthorized') {
    throw json<ProjectErrorResponseData>({ contactEmail: 'administrator@fake.com'}, { status: 401 });
  }

  let project: Project;

  if (projectId === 'broken') {
    // Uh oh - in this flow we somehow didn't get our data nested under `project`
    // and instead got it at the root - this will cause a render error!
    project = {
      id: projectId,
      name: 'Break Some Stuff',
      owner: 'The Joker',
      deadline: 'June 2022',
      cost: 'FREE',
    };
  } else {
    project = {
      id: projectId!,
      name: 'Build Some Stuff',
      owner: 'Joe',
      deadline: 'June 2022',
      cost: '$5,000 USD',
    };
  }

  return json({ project });
}
