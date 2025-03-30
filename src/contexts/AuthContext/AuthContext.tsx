import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { authContext } from './context';
import { Children } from '../../shared/types/Children';
import { autentication } from '../../api/Jwt/Auth';

export const AuthProvider: React.FC<Children> = ({ children }) => {
  const LOCAL_STORAGE_AUTH_TOKEN = 'LOCAL_STORAGE_AUTH_TOKEN';
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN);
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, token);
      setAuthToken(token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
    }
  }, []);
  const handleLogin = useCallback(
    async (email: string, pass: string): Promise<string | Error> => {
      const auth = await autentication.jwtAuth(email, pass);
      if (auth instanceof Error) {
        return auth.message;
      } else {
        setAuthToken(auth.accessToken),
          localStorage.setItem(
            LOCAL_STORAGE_AUTH_TOKEN,
            JSON.stringify(auth.accessToken),
          );
        return auth.accessToken;
      }
    },
    [],
  );
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
    setAuthToken(undefined);
  }, []);
  const isAuthenticated = useMemo(() => !!authToken, [authToken]);

  return (
    <authContext.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
