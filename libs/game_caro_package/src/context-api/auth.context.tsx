import { useLocalStorage } from 'game_caro_package/hocs/use-localstorage';
import { TAuthenticatedUser } from 'game_caro_package/services/auth.service';
import React, { createContext, useCallback } from 'react';
import { LOCAL_STORAGE_KEYS } from 'game_caro_package/libs/constants';
import { Navigate } from 'react-router-dom';
import { EPagePath } from 'game_caro_package/libs/constants';

export type TAuthContext = {
  user?: TAuthenticatedUser;
  login: (user: TAuthenticatedUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<TAuthenticatedUser | undefined>(
    LOCAL_STORAGE_KEYS.AUTHENTICATED_USER,
    undefined
  );

  const login = useCallback(
    (user: TAuthenticatedUser) => {
      setUser(user);

      return <Navigate to={EPagePath.HOME} replace />;
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};