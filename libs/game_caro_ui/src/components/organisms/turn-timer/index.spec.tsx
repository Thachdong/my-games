import { render } from '@testing-library/react';
import { TurnTimer } from './index';

describe('GameCaro', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TurnTimer
        time={10}
        isRunning={true}
        callback={() => {
          console.log('callback');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
