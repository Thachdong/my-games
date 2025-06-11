import { Button } from 'game_caro_package/components/atoms';
import { Modal } from 'game_caro_package/components/molecules';
import { Form } from 'react-router-dom';
import { useToggle } from 'react-use';

export const GameCreation: React.FC = () => {
  const [isCreateGame, toggleCreateGame] = useToggle(false);
  const [isCreateTournament, toggleCreateTournament] = useToggle(false);
  
  return (
    <div className="flex flex-col justify-center gap-2">
      <Button onClick={toggleCreateGame} variant="outline">
        CREATE A GAME
      </Button>
      <Button onClick={toggleCreateTournament} variant="outline">
        CREATE A TOURNAMENT
      </Button>

      <Modal isOpen={isCreateGame} onClose={toggleCreateGame}>
        <Form>
          <label htmlFor="round-time" className="block mb-2">
            Round time
          </label>
          <div className="flex items-center gap-2">
            <input
              id="round-time"
              name="round-time"
              type="range"
              min={15}
              max={60}
              step={15}
              list="round-time-options"
              defaultValue={15}
              className="w-full"

            />
            <span id="round-time-value" className="ml-2">
              15s
            </span>
          </div>
          <datalist id="round-time-options">
            <option value={15} label="15s" />
            <option value={20} label="20s" />
            <option value={30} label="30s" />
            <option value={45} label="45s" />
            <option value={60} label="1m" />
          </datalist>
        </Form>
      </Modal>

      <Modal isOpen={isCreateTournament} onClose={toggleCreateTournament}>
        create tournament modal
      </Modal>
    </div>
  );
};
