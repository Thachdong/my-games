import { TAuthenticatedUser } from "game_caro_package/services/auth.service";
import { createContext } from "react";

export type TAuthContext = {
    user?: TAuthenticatedUser;
    login: (user: TAuthenticatedUser) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<TAuthContext | undefined>(undefined)
