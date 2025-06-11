import { TurnTimer } from '../turn-timer';

type TUserInfoProps = {
  name: string;
  playerLabel: 'X' | 'O';
  isCurrentPlayer: boolean;
};

export const UserInfo: React.FC<Readonly<TUserInfoProps>> = ({
  name,
  playerLabel,
  isCurrentPlayer,
}) => {
  return (
    <div className="border border-gray-400 rounded-md p-4">
      <p>
        <strong>{name}</strong>
        {isCurrentPlayer && <span className="text-gray-500 ml-1">(you)</span>}
      </p>

      <p>Player: {playerLabel}</p>

      <TurnTimer
        time={15}
        isRunning={isCurrentPlayer}
        callback={() => {
          console.log('callback');
        }}
      />
    </div>
  );
};
