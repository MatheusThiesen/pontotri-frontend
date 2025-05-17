"use client";

import { TOKEN_LABEL_AUTH, TOKEN_LABEL_REFRESH } from "@/middleware";
import { api } from "@/services/api";
import nookies, { parseCookies } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SignCredentials = {
  cod?: number;
  cnpj?: string;
  email?: string;
  password?: string;
  code?: string;
};

type ResponseSignIn = {
  accessToken: string;
};

type Role = "ADMIN" | "OWNER" | "MANAGER" | "EMPLOYEE";

type Me = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
};

type AuthContextData = {
  signIn(credentials: SignCredentials): Promise<ResponseSignIn | void>;

  signOut: () => void;
  me: Me;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function signOut() {
  nookies.set({}, TOKEN_LABEL_AUTH, "", {
    maxAge: -1,
    path: "/",
  });
  nookies.set({}, TOKEN_LABEL_REFRESH, "", {
    maxAge: -1,
    path: "/",
  });

  window.location.reload();
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { [TOKEN_LABEL_AUTH]: tokenCookies } = parseCookies();
  const [me, setMe] = useState<Me>({} as Me);
  const [token, setToken] = useState(tokenCookies);

  const isAuthenticated = !!token && !!me;

  async function signIn(credentials: SignCredentials) {
    const singResponse = await api.post<ResponseSignIn>(
      "sessions",
      credentials
    );

    const { accessToken } = singResponse.data;

    setToken(accessToken);

    nookies.set(null, TOKEN_LABEL_AUTH, accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }

  function getMe(token: string) {
    api
      .get<Me>("/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMe(response.data);
      })
      .catch(() => {
        // signOut();
      });
  }

  useEffect(() => {
    if (token) {
      getMe(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        me,
        isAuthenticated,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
