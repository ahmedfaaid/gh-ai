'use client';
import Chat from '@/components/chat';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header />
      <Chat />
    </div>
  );
}
