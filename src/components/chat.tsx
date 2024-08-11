'use client';
import React, { useEffect, useRef } from 'react';
import AiChat from './ai-chat';
import UserChat from './user-chat';

interface ChatProps {
  messages: any[];
}

export default function Chat({ messages }: ChatProps) {
  const chatBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='p-4 my-20 min-h-[calc(100vh-160px)]' ref={chatBox}>
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
