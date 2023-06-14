import './App.scss';

import { Route, Routes } from 'react-router-dom';

import { NoMatch } from './components';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div>
      <h1>Search Params Example</h1>

      <p>
        This example demonstrates a simple search page that makes a request for
        user data to the GitHub API and displays information for that user on
        the page. The example uses the <code>useSearchParams()</code> hook to
        read and write the URL query string.
      </p>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
