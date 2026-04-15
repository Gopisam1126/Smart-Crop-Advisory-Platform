import { useState, useCallback, useMemo, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../api/appClient";
import { tokenUtils } from "../utils/token";
import type {
  AuthContextType,
  loginCredentials,
  User,
} from "../types/auth.types";

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
