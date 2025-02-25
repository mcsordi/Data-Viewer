import React, { useCallback, useState } from 'react';
import { theme } from './context';
type TThemeContext = {
  children: React.ReactNode;
  darkTheme?: string;
};

export const ThemeContext: React.FC<TThemeContext> = ({
  children,
  darkTheme = '',
}) => {
  const handleTheme = useCallback(() => {
    setThemeDark((value) => (value == '' ? 'dark' : ''));
  }, []);

  const [themeDark, setThemeDark] = useState<string>(darkTheme);
  return (
    <theme.Provider value={{ themeDark, handleTheme }}>
      {children}
    </theme.Provider>
  );
};
