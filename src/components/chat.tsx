'use client';
import { useChat } from 'ai/react';
import React from 'react';
import AiChat from './ai-chat';
import UserChat from './user-chat';

export default function Chat() {
  const { handleInputChange, handleSubmit, input, messages } = useChat({
    credentials: 'include'
  });

  const responseRender = () => (
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

  return (
    <div>
      {responseRender()}
      <div className='fixed bottom-0 w-full'>
        <form
          onSubmit={handleSubmit}
          className='flex justify-between bg-indigo-200'
        >
          <textarea
            rows={1}
            contentEditable
            name='prompt'
            placeholder='Ask me something about Ghana'
            className='chatinput'
            value={input}
            onChange={handleInputChange}
          />
          <button type='submit' className='m-2'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
