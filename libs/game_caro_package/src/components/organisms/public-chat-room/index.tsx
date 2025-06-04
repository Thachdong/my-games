import React, { useCallback, useEffect, useState } from 'react';
import { Button, Textarea } from 'game_caro_package/components/atoms';
import { useAuth, useSocket } from 'game_caro_package/context-api';
import { sendMessageToRoomService } from 'game_caro_package/services';
import { ChatContainer } from 'game_caro_package/components/molecules';

export const PublicChatRoom: React.FC = () => {
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const [socket] = useSocket();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!message.trim() || !user?.publicRoomId || !socket) {
        console.error(
          'Message, room ID, or socket client is missing',
          message,
          user?.publicRoomId,
          socket
        );
        return;
      }

      if (socket && !socket.connected) {
        socket.connect();
      }

      sendMessageToRoomService(socket, user?.publicRoomId, message);

      setMessage('');
    },
    [message, socket, setMessage, user?.publicRoomId]
  );

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <div className="w-full border rounded-lg bg-white shadow-md max-w-md mx-auto flex flex-col">
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
        <Button className="h-8" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
