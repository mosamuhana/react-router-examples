//import type { LoaderFunctionArgs } from "react-router-dom";

import { delay } from '../../utils';
import { MessagesData } from '../../types';

export const messagesLoader = async () => {
  await delay(500);

  const data: MessagesData = {
    messages: [
      "Message 1 from Dashboard.tsx loader",
      "Message 2 from Dashboard.tsx loader",
      "Message 3 from Dashboard.tsx loader",
    ],
  };

  return data;
};
