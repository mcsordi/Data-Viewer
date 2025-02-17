import React from 'react';
import { RouterBrowser } from './shared/routes';
import { ThemeContext } from './contexts/ThemeContext/ThemeContext';

function App() {
  return (
    <ThemeContext>
      <RouterBrowser />
    </ThemeContext>
  );
}
export default App;
