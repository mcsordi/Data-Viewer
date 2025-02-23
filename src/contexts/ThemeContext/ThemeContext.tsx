import React, { useCallback, useState } from 'react';
import { theme } from './context';
type TThemeContext = {
  children: React.ReactNode;
  darkTheme?: boolean;
};

export const ThemeContext: React.FC<TThemeContext> = ({
  children,
  darkTheme = false,
}) => {
  const handleTheme = useCallback(() => {
    setThemeDark((value) => !value);
  }, []);

  const [themeDark, setThemeDark] = useState<boolean>(darkTheme);
  return (
    <theme.Provider value={{ themeDark, handleTheme }}>
      {children}
    </theme.Provider>
  );
};
