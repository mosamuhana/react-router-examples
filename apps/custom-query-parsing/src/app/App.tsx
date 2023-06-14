import './App.scss';

import { Routes, Route } from 'react-router-dom';
import { NoMatch } from './pages/NoMatch';
import { Home } from './pages/Home';

export function App() {
  return (
    <div>
      <h1>Custom Query Parsing Example</h1>

      <p>
        This example demonstrates how to store a complex data structure in a URL
        query parameter.
      </p>

      <p>
        Each time a field in the form below changes, the URL is updated with a
        serialized version of the form's values. To see the effect this has,
        manipulate some fields in the form. Then, copy the URL in the address
        bar and paste it into a new tab in your browser to see the form in the
        exact same state as when you left it!
      </p>

      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
