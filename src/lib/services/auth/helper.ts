import Cookies from "js-cookie";
import { AuthToken } from "~/lib/types";
import { deserialize, serialize } from "~/lib/utils";
import { authCookiesKey } from "./constant";
import type { CurrentUser } from "./type";

export const getUserCredentials = () => {
  const userLocal =
    window.localStorage.getItem(authCookiesKey.user) || undefined;
  const tokenCookies = Cookies.get(authCookiesKey.token);

  if (typeof userLocal !== "undefined" && typeof tokenCookies !== "undefined") {
    const parseToken = deserialize<AuthToken>(tokenCookies);
    const parseUser = deserialize<CurrentUser>(userLocal);

    if (typeof parseToken !== "undefined" && typeof parseUser !== "undefined") {
      return {
        token: parseToken,
        user: parseUser,
      };
    }
  }

  return undefined;
};

export const removeUserCredentials = () => {
  Cookies.remove(authCookiesKey.token);
  window.localStorage.removeItem(authCookiesKey.user);
};

export const setUserCredentials = (props: {
  token: AuthToken;
  user: CurrentUser;
  expiresAt?: Date;
}) => {
  const serializedToken = serialize(props.token);
  const serializedUser = serialize(props.user);

  let expires: Date;

  if (!props.token.expiresAt) {
    expires = props.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  } else {
    expires = new Date(props.token.expiresAt);
  }

  const options: Cookies.CookieAttributes = {
    secure: true,
    sameSite: "Strict",
    path: "/",
    expires,
  };

  Cookies.set(authCookiesKey.token, serializedToken, options);
  window.localStorage.setItem(authCookiesKey.user, serializedUser);
};
