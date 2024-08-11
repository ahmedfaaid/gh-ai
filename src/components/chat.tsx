'use client';
import { useChat } from 'ai/react';
import React from 'react';
import AiChat from './ai-chat';
import UserChat from './user-chat';

export default function Chat() {
  const { messages } = useChat({
    credentials: 'include'
  });

  return (
    <div className='p-4 my-20'>
      {messages.map((message, index) => {
        if (message.role === 'user') {
          return (
            <React.Fragment key={message.id}>
              <UserChat message={message} />
              {index < messages.length - 1 && <hr />}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={message.id}>
              <AiChat message={message} />
              {index < messages.length - 1 && <hr />}
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}
