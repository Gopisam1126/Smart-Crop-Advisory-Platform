const accessTokenKey = import.meta.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = import.meta.env.REFRESH_TOKEN_KEY;
const userKey = import.meta.env.USER_KEY;

export const tokenUtils = {
  getAccessToken: (): string | null => localStorage.getItem(accessTokenKey),

  getRefreshToken: (): string | null => localStorage.getItem(refreshTokenKey),

  getUser: <T>(): T | null => {
    const raw = localStorage.getItem(userKey);

    try {
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
  },

  setUser: (user: object): void => {
    localStorage.setItem(userKey, JSON.stringify(user));
  },

  clearAll: (): void => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(userKey);
  },
};
