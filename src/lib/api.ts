import axios, {
  type AxiosHeaders,
  type Method,
  type RawAxiosRequestHeaders,
} from "axios";
import Cookies from "js-cookie";
import { authCookiesKey } from "./services/auth";
import type { AuthToken } from "./types";
import { assertIsDefined, deserialize } from "./utils";

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
  const serializeToken = Cookies.get(authCookiesKey.token);

  if (typeof serializeToken !== "undefined") {
    const parseToken = deserialize<AuthToken>(serializeToken);

    assertIsDefined(parseToken);

    return {
      Authorization: `Bearer ${parseToken.token}`,
    };
  }

  return undefined;
};
