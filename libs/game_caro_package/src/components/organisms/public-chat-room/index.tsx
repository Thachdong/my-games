import { Button, Input } from 'game_caro_package/components/atoms';
import React from 'react';

export const PublicChatRoom: React.FC = () => {
  return (
    <div className="w-full border rounded-lg bg-white shadow-md max-w-md mx-auto h-full flex flex-col">
      <p className="font-semibold mb-2 px-4 py-2 bg-blue-100 rounded">
        Public chat room
      </p>
      <div className="mb-4 flex-1 overflow-y-auto bg-gray-50 rounded p-2">
        Messages
      </div>
      <form className='px-2'>
        <Input name="message" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};
