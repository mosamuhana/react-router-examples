import { ActionFunctionArgs, LoaderFunctionArgs, defer } from 'react-router-dom';

import { HomeLoaderData } from "./types";
import { delay, rand, reject, resolve } from "./utils";
import { Todos, addTodo, deleteTodo, getTodos } from './todos';

export async function homeLoader(): Promise<HomeLoaderData> {
  await delay();
  return {
    date: new Date().toISOString()
  };
}

export async function todosAction({ request }: ActionFunctionArgs) {
  await delay();

  const formData = await request.formData();

  // Deletion via fetcher
  if (formData.get('action') === 'delete') {
    const id = formData.get('todoId');
    if (typeof id === 'string') {
      deleteTodo(id);
      return { ok: true };
    }
  }

  // Addition via <Form>
  const todo = formData.get('todo');
  if (typeof todo === 'string') {
    addTodo(todo);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: '/todos' }
  });
}

export async function todosLoader(): Promise<Todos> {
  await delay();
  return getTodos();
}

export async function todoLoader({ params }: LoaderFunctionArgs): Promise<string> {
  await delay();
  const todos = getTodos();
  if (!params.id) {
    throw new Error('Expected params.id');
  }
  const todo = todos[params.id];
  if (!todo) {
    throw new Error(`Uh oh, I couldn't find a todo with id "${params.id}"`);
  }
  return todo;
}

export async function deferredLoader() {
  return defer({
    critical1: await resolve('Critical 1', 250),
    critical2: await resolve('Critical 2', 500),
    lazyResolved: Promise.resolve('Lazy Data immediately resolved - ' + rand()),
    lazy1: resolve('Lazy 1', 1000),
    lazy2: resolve('Lazy 2', 1500),
    lazy3: resolve('Lazy 3', 2000),
    lazyError: reject<string>(new Error('Kaboom!'), 2500)
  });
}
