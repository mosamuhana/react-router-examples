import { createBrowserRouter } from 'react-router-dom';

import NotePage, { loader as noteLoader, action as noteAction } from './routes/NotePage';
import HomePage, { loader as rootLoader } from './routes/HomePage';
import NewNote, { action as newNoteAction } from './routes/NewNotePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: rootLoader,
    children: [
      {
        path: 'new',
        element: <NewNote />,
        action: newNoteAction
      },
      {
        path: 'note/:noteId',
        element: <NotePage />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>
      }
    ]
  }
]);
