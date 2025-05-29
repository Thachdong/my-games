import { GameCreation } from 'game_caro_package/components/organisms/game-creation';
import { GameList } from 'game_caro_package/components/organisms/game-list';
import { PublicChatRoom } from 'game_caro_package/components/organisms/public-chat-room';
import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-[275px,1fr,275px] gap-4 mt-8 pb-4"
      style={{
        height: 'calc(100vh - 64px - 32px)',
      }}
    >
      <PublicChatRoom />

      <GameList />

      <GameCreation />
    </div>
  );
};
