import { IGame } from 'game_caro_ui/libs';

type TGameResultProps = {
  gameStatus: IGame['gameStatus'];
};

export const GameResult: React.FC<Readonly<TGameResultProps>> = ({
  gameStatus,
}) => {
  if (gameStatus === 'playing') return null;

  return (
    <div className="border border-green-700 text-green-700 rounded-md p-4">
      {gameStatus === 'draw' ? 'Game Draw!' : `Player ${gameStatus} Wins!`}
    </div>
  );
};
