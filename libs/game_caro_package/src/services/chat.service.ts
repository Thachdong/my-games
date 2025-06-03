import { apiEndpoints } from 'game_caro_package/services/api-service';
import api from 'game_caro_package/services/api-service';
import { createService } from 'game_caro_package/hocs/create-service';
import { TPaginateParameters, TPagination } from 'game_caro_package/types';
import { io, Socket } from 'socket.io-client';
import {
  ELocalStorageKeys,
  getLocalStorageService,
  TAuthenticatedUser,
} from '.';

export enum ESubscribeEvents {
  MESSAGE = 'message',
  GAME_MOVE = 'gameMove',
  USER_JOINED_GAME = 'userJoinedGame',
  USER_JOINED_TOURNAMENT = 'userJoinedTournament',
  USER_LEFT_TOURNAMENT = 'userLeftTournament',
}

/**
 * ====================== Initial Socket Client Service ======================
 */
export const createSocketClientService = (): Socket | void => {
  const user = getLocalStorageService<TAuthenticatedUser>(
    ELocalStorageKeys.AUTHENTICATED_USER
  );

  if (!user || !user.accessToken) {
    console.log('User is not authenticated or access token is missing');

    return;
  }

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3000';

  const socket = io(SOCKET_URL, {
    auth: {
      token: `Bearer ${user.accessToken}`,
    },
  });

  socket.connect();

  return socket;
};

/**
 * ====================== Send Message Service ======================
 */
export const sendMessageToRoomService = (
  socketClient: Socket,
  roomId: string,
  message: string
) => {
  if (!socketClient || !roomId || !message) {
    throw new Error('Socket client, roomId, and message are required');
  }

  socketClient.emit(ESubscribeEvents.MESSAGE, {
    roomId,
    message,
  });
};

/**
 * ====================== Game Move Service ======================
 */
export type TMoveData = {
  gameId: string;
  positionX: number;
  positionY: number;
};

export const gameMoveService = (socketClient: Socket, moveData: TMoveData) => {
  if (!socketClient || !moveData) {
    throw new Error('Socket client and move data are required');
  }

  const { gameId, positionX, positionY } = moveData;

  socketClient.emit(ESubscribeEvents.GAME_MOVE, {
    gameId,
    positionX,
    positionY,
  });
};

/**
 * ====================== User Join Game Service ======================
 */
export const userJoinGameService = (socketClient: Socket, gameId: string) => {
  if (!socketClient || !gameId) {
    throw new Error('Socket client and gameId are required');
  }

  socketClient.emit(ESubscribeEvents.USER_JOINED_GAME, gameId);
};

/**
 * ====================== User Join Tournament Service ======================
 */
export const userJoinTournamentService = (
  socketClient: Socket,
  tournamentId: string
) => {
  if (!socketClient || !tournamentId) {
    throw new Error('Socket client and tournamentId are required');
  }

  socketClient.emit(ESubscribeEvents.USER_JOINED_TOURNAMENT, tournamentId);
};

/**
 * ====================== User Leave Tournament Service ======================
 */
export const userLeaveTournamentService = (
  socketClient: Socket,
  tournamentId: string
) => {
  if (!socketClient || !tournamentId) {
    throw new Error('Socket client and tournamentId are required');
  }

  socketClient.emit(ESubscribeEvents.USER_LEFT_TOURNAMENT, tournamentId);
};

/**
 * ====================== Get Messages By RoomId Service ======================
 */
export type TMessage = {
  id: string;
  roomId: string;
  sender: {
    id: string;
    username: string;
  };
  content: string;
  createdAt: string;
};

const handleGetMessagesByRoomId = async (
  roomId: string,
  page?: number,
  limit?: number
) => {
  const { data } = await api.get<TPaginateParameters, TPagination<TMessage>>(
    apiEndpoints.getRoomMessages.getPath(roomId),
    {
      page,
      limit,
    }
  );

  return {
    data: data.data,
    meta: data.meta,
  };
};

export const getMessagesByRoomIdService = createService(
  handleGetMessagesByRoomId
);
