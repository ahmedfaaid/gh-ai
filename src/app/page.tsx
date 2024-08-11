'use client';
import Chat from '@/components/chat';
import ChatInput from '@/components/chat-input';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Chat />
      <ChatInput />
    </div>
  );
}
