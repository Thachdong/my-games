import { render } from '@testing-library/react';

import { GameBoard } from './index';

describe('GameCaroUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GameBoard
        board={[]}
        setBoard={() => {
          console.log('setBoard');
        }}
        currentPlayer={'X'}
        setCurrentPlayer={() => {
          console.log('setCurrentPlayer');
        }}
        gameStatus={'playing'}
        setGameStatus={() => {
          console.log('setGameStatus');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
