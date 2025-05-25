import { render } from '@testing-library/react';
import { GameCaro } from './index';

describe('GameCaro', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameCaro />);
    expect(baseElement).toBeTruthy();
  });
});