import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useMemo,
} from "react";
import apiClient from "../api/appClient";
import { tokenUtils } from "../utils/token";
import type {
  AuthContextType,
  loginCredentials,
  User,
} from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    tokenUtils.getUser<User | null>(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials: loginCredentials): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.post("/auth/login", credentials);

        tokenUtils.setTokens(data.accessToken, data.refreshToken);
        tokenUtils.setUser(data.user);
        setUser(data.user);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback((): void => {
    tokenUtils.clearAll();
    setUser(null);
  }, []);

  // Memoize so consumers don't re-render on unrelated state changes
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
