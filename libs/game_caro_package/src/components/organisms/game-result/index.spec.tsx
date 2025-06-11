import { render } from '@testing-library/react';
import { GameResult } from './index';

describe('GameCaro', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameResult gameStatus="playing" />);
    expect(baseElement).toBeTruthy();
  });
});
