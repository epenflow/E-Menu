import axios, {
  type AxiosHeaders,
  type Method,
  type RawAxiosRequestHeaders,
} from "axios";
import Cookies from "js-cookie";
import type { AuthToken } from "./types";
import { assertIsDefined, deserialize } from "./utils";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

const api = axios.create({ baseURL });
export default api;

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export const apiHeader = ():
  | (RawAxiosRequestHeaders & MethodsHeaders)
  | AxiosHeaders
  | undefined => {
  const token = Cookies.get("token");

  if (typeof token !== "undefined") {
    const parseToken = deserialize<AuthToken>(token);

    assertIsDefined(parseToken);

    return {
      Authorization: `Bearer ${parseToken.token}`,
    };
  }

  return undefined;
};
