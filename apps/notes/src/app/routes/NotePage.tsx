import { useLoaderData, Form, redirect } from 'react-router-dom';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';

import { deleteNote, getNote } from '../notes';
import { Note } from '../types';

export function Component() {
  const note = useLoaderData() as Note;

  return (
    <div>
      <h2>{note.title}</h2>
      <div>{note.content}</div>

      <Form method="post" style={{ marginTop: '2rem' }}>
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const note = await getNote(params.noteId!);
  if (!note) throw new Response('', { status: 404 });
  return note;
}

export async function action({ params }: ActionFunctionArgs) {
  await deleteNote(params.noteId!);
  return redirect('/new');
}

Component.displayName = 'NotePage';

export default Component;
