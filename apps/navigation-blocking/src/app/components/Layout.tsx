import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { getHistoryIndex } from '../utils'

export function Layout() {
  console.log(window.history.state);
  const [historyIndex, setHistoryIndex] = useState(getHistoryIndex());
  const location = useLocation();

  // Expose the underlying history index in the UI for debugging
  useEffect(() => {
    setHistoryIndex(getHistoryIndex());
  }, [location]);

  // Give us meaningful document titles for popping back/forward more than 1 entry
  useEffect(() => {
    document.title = location.pathname;
  }, [location]);

  return (
    <>
      <h1>Navigation Blocking Example</h1>
      <nav>
        <Link to="/">Index</Link>&nbsp;&nbsp;
        <Link to="/one">One</Link>&nbsp;&nbsp;
        <Link to="/two">Two</Link>&nbsp;&nbsp;
        <Link to="/three">Three (Form with blocker)</Link>&nbsp;&nbsp;
        <Link to="/four">Four</Link>&nbsp;&nbsp;
        <Link to="/five">Five</Link>&nbsp;&nbsp;
      </nav>
      <p>
        Current location (index): {location.pathname} ({historyIndex})
      </p>
      <Outlet />
    </>
  );
}
