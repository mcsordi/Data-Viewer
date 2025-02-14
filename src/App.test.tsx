import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<app/>', () => {
  it('renders a dummy test', () => {
    render(<App />);

    expect(1).toBe(1);
  });
});
