import { TOKEN_LABEL_AUTH } from "@/middleware";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "backend-pontotri.up.railway.app"
    : "http://localhost:5555/";

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined
) {
  const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      let cookies = parseCookies(ctx);
      const { [TOKEN_LABEL_AUTH]: token } = cookies;

      if (token) {
        config.headers!["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
