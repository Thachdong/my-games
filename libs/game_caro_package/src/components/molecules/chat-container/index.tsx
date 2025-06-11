import { useAuth, useSocket } from 'game_caro_package/context-api';
import { usePagination } from 'game_caro_package/hooks/usePagination';
import {
  ESubscribeEvents,
  getMessagesByRoomIdService,
  TMessage,
} from 'game_caro_package/services';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ChatContainer: React.FC = () => {
  const { user } = useAuth();
  const { fetchItems, items, setItems, meta, hasMore } =
    usePagination<TMessage>();
  const [socket] = useSocket();

  const messages = useMemo(() => {
    return items.reduce((result: TMessage[], msg: TMessage) => {
      const index = result.findIndex((i) => i.id === msg.id);

      if (index === -1) {
        result.push(msg);
      }
      return result;
    }, []);
  }, [items]);

  const handleGetMessage = useCallback(
    async (page: number) => {
      if (!user?.publicRoomId) {
        return null;
      }

      const result = await getMessagesByRoomIdService({
        roomId: user.publicRoomId,
        page,
      });

      if ('data' in result && result.meta) {
        return {
          data: result.data,
          meta: result.meta,
        };
      }

      return null;
    },
    [user?.publicRoomId]
  );

  const fetchNextMessages = useCallback(() => {
    if (!meta) return;

    fetchItems(() => handleGetMessage(meta?.page + 1));
  }, [meta, handleGetMessage, fetchItems]);

  /**
   * Fetch first page
   */
  useEffect(() => {
    fetchItems(() => handleGetMessage(1));
  }, [handleGetMessage, fetchItems]);

  /**
   * Join room and start listen message
   */
  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }

    if (socket) {
      socket.emit(ESubscribeEvents.JOIN_ROOM, { roomId: user?.publicRoomId });

      socket.on(ESubscribeEvents.MESSAGE, (msg: TMessage) => {
        setItems((prev) => [msg, ...prev]);
      });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket, user?.publicRoomId, setItems]);

  return (
    <div
      id="scrollable-messages-container"
      className="w-full overflow-y-auto px-2"
      style={{
        /**
         * 100vh: 100 view height
         * 64px: height of header
         * 32px: margin top
         * 40px: height of chatroom title
         * 88px: height of input message form
         * 48px: threshold
         */
        height: 'calc(100vh - 64px - 32px - 40px - 88px - 48px)',
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasMore}
        loader={
          <p className="text-sm text-gray-500 text-sm italic text-center">
            Loading more messages...
          </p>
        }
        next={fetchNextMessages}
        scrollableTarget="scrollable-messages-container"
        className="flex flex-col-reverse w-full"
        inverse={true}
        height={'calc(100vh - 64px - 32px - 40px - 88px - 48px)'}
        initialScrollY={Number.MAX_SAFE_INTEGER}
      >
        {messages.map((message) => (
          <div key={message.id} id={message.id} className="w-full mb-1">
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
