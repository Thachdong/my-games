import { useAuth } from 'game_caro_package/context-api';
import { usePagination } from 'game_caro_package/hooks/usePagination';
import {
  getMessagesByRoomIdService,
  TMessage,
} from 'game_caro_package/services';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type TChatContainerProps = {
  messages: TMessage[];
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
};

export const ChatContainer: React.FC<TChatContainerProps> = ({
  messages,
  setMessages,
}) => {
  const { user } = useAuth();
  const { fetchItems, items } = usePagination<TMessage>();

  console.log(items, 'items');

  const loader = useMemo(() => {
    return (
      <p className="text-sm text-gray-500 text-sm italic text-center">
        Loading more messages...
      </p>
    );
  }, []);

  const fetchNextMessages = useCallback(async () => {
    if (!user?.publicRoomId) {
      return;
    }

    const { data } = await getMessagesByRoomIdService(user.publicRoomId);

    if (data?.data) {
      setMessages((prevMessages) => [...data.data, ...prevMessages]);
    }
  }, [user, setMessages]);

  useEffect(() => {
    fetchNextMessages();
  }, [fetchNextMessages]);

  const handleGMessage = useCallback(async() => {
    if (!user?.publicRoomId) {
      return;
    }

    const { data } = await getMessagesByRoomIdService(user.publicRoomId, 1);

    if (data) {
      return { ...data }
    }
  }, [user?.publicRoomId])

  useEffect(() => {
    fetchItems(handleGMessage);
  }, [handleGMessage, fetchItems]);

  return (
    <div
      id="scrollable-messages-container"
      className="flex flex-col-reverse overflow-y-auto h-full"
    >
      <InfiniteScroll
        dataLength={messages.length}
        hasMore={true}
        loader={loader}
        next={fetchNextMessages}
        scrollableTarget="scrollable-messages-container"
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-1">
            <span className="font-semibold">{message.sender.username}:</span>{' '}
            {message.content}
            <span className="text-gray-500 text-sm ml-2">
              {moment(message.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
