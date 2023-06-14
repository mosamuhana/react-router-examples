import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';

import { App } from './app/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
