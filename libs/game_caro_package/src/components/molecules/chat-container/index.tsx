import { useAuth } from 'game_caro_package/context-api';
import { usePagination } from 'game_caro_package/hooks/usePagination';
import {
  getMessagesByRoomIdService,
  TMessage,
} from 'game_caro_package/services';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ChatContainer: React.FC = () => {
  const { user } = useAuth();
  const { fetchItems, items } = usePagination<TMessage>();

  const messages = useMemo(() => {
    return items.reduce((result: TMessage[], msg: TMessage) => {
      const index = result.findIndex((i) => i.id === msg.id);

      if (index === -1) {
        result.push(msg);
      }
      return result;
    }, []);
  }, [items]);

  const loader = useMemo(() => {
    return (
      <p className="text-sm text-gray-500 text-sm italic text-center">
        Loading more messages...
      </p>
    );
  }, []);

  const fetchNextMessages = useCallback(() => {
    console.log('fetchNextMessages');
  }, []);

  const handleGMessage = useCallback(async () => {
    if (!user?.publicRoomId) {
      return null;
    }

    const result = await getMessagesByRoomIdService({
      roomId: user.publicRoomId,
    });

    if ('data' in result && result.meta) {
      return {
        data: result.data,
        meta: result.meta,
      };
    }

    return null;
  }, [user?.publicRoomId]);

  useEffect(() => {
    fetchItems(handleGMessage);
  }, [handleGMessage, fetchItems]);

  return (
    <div
      id="scrollable-messages-container"
      className="flex flex-col-reverse overflow-y-auto h-full px-2"
    >
      <InfiniteScroll
        dataLength={items.length}
        hasMore={true}
        loader={loader}
        next={fetchNextMessages}
        scrollableTarget="scrollable-messages-container"
      >
        {messages.map((message) => (
          <div key={message.id} className="mb-1">
            <p>
              <span className="font-semibold text-sm">
                {message.sender.username}:{' '}
              </span>

              {message.content}
            </p>

            <p className="text-gray-500 text-xs text-right ml-2">
              {moment(message.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
