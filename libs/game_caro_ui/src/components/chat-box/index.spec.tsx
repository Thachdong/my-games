import { render } from '@testing-library/react';

import { ChatBox } from './index';

describe('ChatBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatBox />);
    expect(baseElement).toBeTruthy();
  });
});
