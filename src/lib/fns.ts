import { Message } from 'ai';

export const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};
