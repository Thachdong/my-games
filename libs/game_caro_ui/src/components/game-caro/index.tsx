import React from 'react';
import { IGame } from '../../libs/types';
import { generateBoard } from '../../libs/utils';
import { ChatBox } from '../chat-box';
import { GameBoard } from '../game-board';
import { GameHistory } from '../game-history';
import { GameResult } from '../game-result';
import { UserInfo } from '../user-info';

export const GameCaro = () => {
  const [board, setBoard] = React.useState<IGame['squares']>(generateBoard());
  const [currentPlayer, setCurrentPlayer] = React.useState<'X' | 'O'>('X');
  const [gameStatus, setGameStatus] = React.useState<
    'playing' | 'X' | 'O' | 'draw'
  >('playing');

  return (
    <section className="flex justify-center gap-4">
      <ChatBox />

      <GameBoard
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />

      <div className="relative w-[225px] flex flex-col gap-y-4 border border-gray-400 rounded-md p-4">
        <UserInfo name="Minh Tuyen" playerLabel="X" isCurrentPlayer={true} />

        <UserInfo name="Thach Dong" playerLabel="O" isCurrentPlayer={false} />

        {gameStatus !== 'playing' && (
          <>
            <GameResult gameStatus={gameStatus} />
            <GameHistory board={board} />
          </>
        )}
      </div>
    </section>
  );
};
