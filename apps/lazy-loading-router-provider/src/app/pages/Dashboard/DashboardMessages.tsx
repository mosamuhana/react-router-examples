import { useLoaderData } from 'react-router-dom';

import { delay } from '../../utils';
import { MessagesData } from '../../types';

export async function loader() {
  await delay(500);

  const data: MessagesData = {
    messages: [
      "Message 1",
      "Message 2",
      "Message 3",
    ],
  };

  return data;
}

export function Component() {
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

Component.displayName = 'DashboardLayout';
