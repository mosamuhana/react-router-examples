const TODOS_KEY = 'todos';

export interface Todos {
  [key: string]: string;
}

export const uuid = () => Math.random().toString(36).substr(2, 9);

export function saveTodos(todos: Todos): void {
  return localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function initializeTodos(): Todos {
  const todos: Todos = new Array(10)
    .fill(null)
    .reduce(
      (acc, _, index) =>
        Object.assign(acc, { [uuid()]: `Seeded Todo #${index + 1}` }),
      {}
    );

  saveTodos(todos);

  return todos;
}

export function getTodos(): Todos {
  let todos: Todos | null = null;
  try {
    const content = localStorage.getItem(TODOS_KEY);
    if (content) {
      todos = JSON.parse(content);
    }
  } catch (e) {}
  if (!todos) {
    todos = initializeTodos();
  }
  return todos;
}

export function addTodo(todo: string): void {
  const newTodos = { ...getTodos() };
  newTodos[uuid()] = todo;
  saveTodos(newTodos);
}

export function deleteTodo(id: string): void {
  const newTodos = { ...getTodos() };
  delete newTodos[id];
  saveTodos(newTodos);
}

export function resetTodos(): void {
  localStorage.removeItem(TODOS_KEY);
  initializeTodos();
}
