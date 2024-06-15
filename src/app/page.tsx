import { useEffect } from 'react';
import ChatWindow from './ChatWindow';

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center p-12">
      <div className="text-4xl font-bold text-gray-900 p-4">Chat App</div>
      <div className="grid grid-cols-3 gap-4">
        <ChatWindow />
        <ChatWindow />
        <ChatWindow />
      </div>
    </main>
  );
}
