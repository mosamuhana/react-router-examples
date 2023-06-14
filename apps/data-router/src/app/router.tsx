import { createBrowserRouter } from 'react-router-dom';

import { Layout, TodosListErrorBoundary } from './components';
import { HomePage } from './pages/HomePage';
import { DeferredPage } from './pages/DeferredPage';
import { TodosListPage } from './pages/TodosListPage';
import { TodoPage } from './pages/TodoPage';
import {
  deferredLoader,
  homeLoader,
  todoLoader,
  todosAction,
  todosLoader
} from './loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: HomePage
      },
      {
        path: 'todos',
        action: todosAction,
        loader: todosLoader,
        Component: TodosListPage,
        ErrorBoundary: TodosListErrorBoundary,
        children: [
          {
            path: ':id',
            loader: todoLoader,
            Component: TodoPage
          }
        ]
      },
      {
        path: 'deferred',
        loader: deferredLoader,
        Component: DeferredPage
      }
    ]
  }
]);
