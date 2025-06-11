import { render } from '@testing-library/react';

import { GameHistory } from './index';
import { IGame } from 'game_caro_package/libs';

describe('GameHistory', () => {
  it('should render successfully', () => {
    const mockBoard: IGame['squares'] = []; // Replace with appropriate mock data if needed
    const { baseElement } = render(<GameHistory board={mockBoard} />);
    expect(baseElement).toBeTruthy();
  });
});
