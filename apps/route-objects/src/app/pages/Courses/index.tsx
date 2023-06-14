import type { RouteObject } from 'react-router-dom';

import CoursesLayout from './CoursesLayout';
import CoursePage from './CoursePage';
import CoursesPage from './CoursesPage';

export const coursesRoute: RouteObject = {
  path: '/courses',
  element: <CoursesLayout />,
  children: [
    { index: true, element: <CoursesPage /> },
    { path: '/courses/:id', element: <CoursePage /> }
  ]
};
