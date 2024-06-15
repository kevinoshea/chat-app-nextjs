'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

interface Message {
  sender: 'me' | 'them';
  msg: string;
}

const ChatWindow = () => {
  const [messageLog, setMessageLog] = useState<Message[]>([]);
  const [messageToSend, setMessageToSend] = useState('');

  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    console.log('Connecting socket');
    const socket = new WebSocket('ws://localhost:3001');

    // Connection opened
    socket.addEventListener('open', (event) => {
      // socket.send("Connection established")
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      // console.log("Message from server ", event.data)
      const messageEntry: Message = {
        sender: 'them',
        msg: event.data,
      };
      setMessageLog((prevState) => prevState.concat(messageEntry));
    });

    // Check for errors
    socket.addEventListener('error', (event) => {
      console.error('WebSocket error: ', event);
    });

    socketRef.current = socket;

    return () => {
      console.log('Unmounting - disconnecting socket');
      socket.close();
    };
  }, []);

  const sendMessage = (e: FormEvent<Element>) => {
    e.preventDefault(); // prevent the form submit from re-rendering the page
    const messageEntry: Message = {
      sender: 'me',
      msg: messageToSend,
    };
    socketRef.current?.send(messageToSend); // TODO - async???? error handling???
    setMessageLog((prevState) => prevState.concat(messageEntry));
    setMessageToSend('');
  };

  return (
    <div className="p-4 bg-gray-200 rounded">
      <div>
        {messageLog.map((messageEntry, index) => (
          <div key={index} style={{ padding: 10, background: messageEntry.sender === 'me' ? 'lightgray' : 'lightgreen' }}>
            {messageEntry.msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <span>
          <input
            type="text"
            className="py-2 px-4"
            placeholder="Your message here"
            value={messageToSend}
            onChange={(event) => setMessageToSend(event.target.value)}
          />
          <button type="submit" onClick={sendMessage} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
            Send
          </button>
        </span>
      </form>
    </div>
  );
};

export default ChatWindow;
