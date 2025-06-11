import { createStateContext } from 'react-use';
import { createSocketClientService } from 'game_caro_package/services';
import { Socket } from 'socket.io-client';

const socket: Socket | void = createSocketClientService();

const [useSocket, SharedSocketProvider] = createStateContext(socket);

export { useSocket, SharedSocketProvider };
