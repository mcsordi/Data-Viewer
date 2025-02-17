import React, { useCallback, useState } from 'react';
import { theme } from './index';
type TThemeContext = {
  children: React.ReactNode;
  darkTheme?: boolean;
};

export const ThemeContext: React.FC<TThemeContext> = ({
  children,
  darkTheme = false,
}) => {
  const handleTheme = useCallback(() => {
    setThemeDefault((value) => !value);
  }, []);

  const [themeDefault, setThemeDefault] = useState<boolean>(darkTheme);
  return (
    <theme.Provider value={{ themeDefault, handleTheme }}>
      {children}
    </theme.Provider>
  );
};
