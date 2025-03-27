import axios, {
  type AxiosHeaders,
  type AxiosRequestConfig,
  type Method,
  type RawAxiosRequestHeaders,
} from "axios";
import { getUserCredentials } from "../services/auth";

export const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

const api = axios.create({ baseURL });
export default api;

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export const apiToken = ():
  | (RawAxiosRequestHeaders & MethodsHeaders)
  | AxiosHeaders
  | undefined => {
  const userCredentials = getUserCredentials();

  if (typeof userCredentials !== "undefined") {
    const { token } = userCredentials;

    return {
      Authorization: `Bearer ${token.token}`,
    };
  }

  return undefined;
};

export const apiConfigWithCredentials = (): AxiosRequestConfig => {
  const userCredentials = getUserCredentials();
  if (userCredentials) {
    const {
      token: { token },
    } = userCredentials;

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
  }

  return Object.create(null);
};
