import { Form, redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';

import { createNote } from '../notes';

export function Component() {
  return (
    <Form method="post">
      <p>
        <label>
          Title
          <br />
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <br />
        <textarea name="content" rows={10} cols={30} id="content" />
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const note = await createNote({ title, content });
  return redirect(`/note/${note.id}`);
}

Component.displayName = 'NewNotePage';

export default Component;
