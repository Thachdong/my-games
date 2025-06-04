import { Button, Textarea } from 'game_caro_package/components/atoms';
import { useAuth } from 'game_caro_package/context-api';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  createSocketClientService,
  ESubscribeEvents,
  sendMessageToRoomService,
  TMessage,
} from 'game_caro_package/services';
import { ChatContainer } from 'game_caro_package/components/molecules';

export const PublicChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const socket = createSocketClientService();

    if (!socket) {
      console.error('Socket connection failed');
      return;
    }

    socketRef.current = socket;

    socket.on(ESubscribeEvents.MESSAGE, (msg: TMessage) => {
      setMessages((prev) => [...prev, { ...msg }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !user?.publicRoomId || !socketRef.current) {
      console.error('Message, room ID, or socket client is missing');
      return;
    }

    sendMessageToRoomService(socketRef.current, user?.publicRoomId, message);

    setMessage('');
  };

  return (
    <div className="w-full border rounded-lg bg-white shadow-md max-w-md mx-auto h-full flex flex-col pb-4">
      <p className="font-semibold mb-2 px-4 py-2 bg-blue-100 rounded">
        Public chat room
      </p>

      <ChatContainer />

      <form className="px-2" onSubmit={handleSubmit}>
        <Textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className='h-8' type="submit">Send</Button>
      </form>
    </div>
  );
};
