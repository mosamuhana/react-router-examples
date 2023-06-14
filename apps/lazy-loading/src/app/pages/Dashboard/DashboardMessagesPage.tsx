import { useLoaderData } from 'react-router-dom';

import { MessagesData } from '../../types';

export function DashboardMessagesPage() {
  const { messages } = useLoaderData() as MessagesData;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (<li key={message}>{message}</li>))}
      </ul>
    </div>
  );
}
