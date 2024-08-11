'use client';
import Chat from '@/components/chat';
import ChatInput from '@/components/chat-input';
import Header from '@/components/header';
import { useChat } from 'ai/react';

export default function Home() {
  const { handleInputChange, handleSubmit, input, messages } = useChat();

  return (
    <div className='min-h-screen w-screen'>
      <Header />
      <Chat messages={messages} />
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
      />
    </div>
  );
}
