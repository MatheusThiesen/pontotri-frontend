"use client";

import { api } from "@/lib/services/api";
import { TOKEN_LABEL_AUTH, TOKEN_LABEL_REFRESH } from "@/middleware";
import nookies, { parseCookies } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Department } from "../hooks/use-fetch-departments";
import { WorkSchedule } from "../hooks/use-fetch-work-schedules";

type SignCredentials = {
  cod?: number;
  cnpj?: string;
  email?: string;
  password?: string;
  code?: string;
};

type ResponseSignIn = {
  access_token: string;
};

export type Role = "ADMIN" | "OWNER" | "MANAGER" | "EMPLOYEE";

export type Company = {
  id: string;
  name: string;
  cnpj: string;
};

type Me = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  companyId: string;
  departmentId: string;
  workScheduleId: string;
  role: Role;
  isActive: boolean;

  department?: Department;
  workSchedule?: WorkSchedule;
  company?: Company;
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
      "/auth/session",
      credentials
    );

    const { ["access_token"]: accessToken } = singResponse.data;

    setToken(accessToken);

    nookies.set(null, TOKEN_LABEL_AUTH, accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }

  function getMe(token: string) {
    api
      .get<Me>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMe(response.data);
      })
      .catch(() => {
        signOut();
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
