import React from 'react';
import { IGame } from 'game_caro_package/libs';

type TGameHistoryProps = {
  board: IGame['squares'];
};

export const GameHistory: React.FC<Readonly<TGameHistoryProps>> = ({
  board,
}) => {
  const [showHistory, setShowHistory] = React.useState(false);

  const moves = React.useMemo(() => {
    const squares = board
      .flat()
      .filter((square) => square.value && square.createdAt);
    return squares.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }, [board]);

  return (
    <div>
      <button
        className="w-full border border-gray-400 rounded-md p-2 hover:bg-gray-100"
        onClick={() => setShowHistory(true)}
      >
        View History
      </button>

      {showHistory && (
        <div className="absolute top-0 bottom-0 left-0 right-0 border border-gray-400 rounded-md bg-white p-2 shadow-lg">
          <div className="flex gap-2 h-[500px] overflow-auto mb-4">
            <div className="flex-1">
              <h3 className="text-red-500 font-bold mb-2">X Moves</h3>
              <ul className="space-y-1">
                {moves
                  .filter((move) => move.value === 'X')
                  .map((move, i) => (
                    <li key={move.createdAt}>
                      {i + 1}. ({move.position.x}, {move.position.y})
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-blue-500 font-bold mb-2">O Moves</h3>
              <ul className="space-y-1">
                {moves
                  .filter((move) => move.value === 'O')
                  .map((move, i) => (
                    <li key={move.createdAt}>
                      {i + 1}. ({move.position.x}, {move.position.y})
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <button
            className="w-full border border-gray-400 rounded-md p-2 hover:bg-gray-100"
            onClick={() => setShowHistory(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
