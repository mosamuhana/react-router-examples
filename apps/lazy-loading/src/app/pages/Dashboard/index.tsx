import { Routes, Route } from 'react-router-dom';

import { DashboardLayout } from './DashboardLayout';
import { DashboardIndexPage } from './DashboardIndexPage';
import { DashboardMessagesPage } from './DashboardMessagesPage';

import { messagesLoader } from './loaders';

export default function DashboardPage() {
  // These routes are defined when this component is loaded on demand via
  // dynamic import() on the home page!
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardIndexPage />} />
        <Route
          path="messages"
          element={<DashboardMessagesPage />}
          loader={messagesLoader}
        />
      </Route>
    </Routes>
  );
}
