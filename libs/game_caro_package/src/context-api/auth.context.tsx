import { useLocalStorage } from 'game_caro_package/hocs/use-localstorage';
import {
  logoutService,
  TAuthenticatedUser,
} from 'game_caro_package/services/auth.service';
import React, { createContext, useCallback, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from 'game_caro_package/libs/constants';
import { Navigate } from 'react-router-dom';
import { EPagePath } from 'game_caro_package/libs/constants';
import { useToast } from './toast.context';

export type TAuthContext = {
  user?: TAuthenticatedUser;
  login: (user: TAuthenticatedUser) => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [localUser, setLocalUser, removeUser] = useLocalStorage<
    TAuthenticatedUser | undefined
  >(LOCAL_STORAGE_KEYS.AUTHENTICATED_USER, undefined);

  const { toast } = useToast();

  const [user, setUser] = useState<TAuthenticatedUser | undefined>(localUser);

  const login = useCallback(
    (user: TAuthenticatedUser) => {
      setUser(user);

      setLocalUser(user);

      toast('Login success!');
    },
    [setUser, setLocalUser, toast]
  );

  const logout = useCallback(async () => {
    removeUser();

    setUser(undefined);

    await logoutService({});
  }, [removeUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
