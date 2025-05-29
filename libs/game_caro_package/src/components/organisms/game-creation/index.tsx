import { Button } from "game_caro_package/components/atoms";

export const GameCreation: React.FC = () => {
  return <div className="flex flex-col justify-center gap-2">
    <Button variant="outline">CREATE A GAME</Button>
    <Button variant="outline">CREATE A TOURNAMENT</Button>
  </div>;
};
