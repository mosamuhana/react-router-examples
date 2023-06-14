import { useEffect, useRef, useState } from 'react';
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigation
} from 'react-router-dom';

import { TodoItem } from '../components';
import { Todos } from '../todos';

export function TodosListPage() {
  const todos = useLoaderData() as Todos;
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (navigation.formData?.get('action') === 'add') {
      setIsAdding(true);
    } else if (navigation.state === 'idle') {
      setIsAdding(false);
      formRef.current?.reset();
    }
  }, [navigation]);

  return (
    <>
      <h2>Todos</h2>
      <p>
        This todo app uses a &lt;Form&gt; to submit new todos and a
        &lt;fetcher.form&gt; to delete todos. Click on a todo item to navigate
        to the /todos/:id route.
      </p>
      <ul>
        <li>
          <Link to="/todos/junk">
            Click this link to force an error in the loader
          </Link>
        </li>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id}>
            <TodoItem id={id} todo={todo} />
          </li>
        ))}
      </ul>
      <Form method="post" ref={formRef}>
        <input type="hidden" name="action" value="add" />
        <input name="todo"></input>
        <button type="submit" disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add'}
        </button>
      </Form>
      <Outlet />
    </>
  );
}
