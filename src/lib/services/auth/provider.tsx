import Cookies from "js-cookie";
import React from "react";
import useIsomorphicLayoutEffect from "~/hooks/isomorphic-layout-effect";
import type { AuthToken, User } from "~/lib/types";
import { deserialize, serialize } from "~/lib/utils";
import { AuthContext } from "./context";
import { AuthReducer } from "./state";
import {
  AuthContextValues,
  type AuthReducerAction,
  type AuthReducerState,
  type SignInResponse,
} from "./type";

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { cookieKey } = resources;
  const [state, dispatch] = React.useReducer<
    AuthReducerState,
    [AuthReducerAction]
  >(AuthReducer, {
    status: "PENDING",
    token: undefined,
    user: undefined,
  });

  const signIn = React.useCallback(
    (props: SignInResponse, expiresAt?: Date) => {
      dispatch({
        type: "SIGN_IN",
        props,
      });
      const serializedToken = serialize(props.token);
      const serializedUser = serialize(props.user);

      let expires: Date;

      if (!props.token.expiresAt) {
        expires = expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      } else {
        expires = new Date(props.token.expiresAt);
      }

      const options: Cookies.CookieAttributes = {
        secure: true,
        sameSite: "Strict",
        path: "/",
        expires,
      };

      Cookies.set(cookieKey.token, serializedToken, options);
      window.localStorage.setItem(cookieKey.user, serializedUser);
    },
    [dispatch, cookieKey],
  );

  const signOut = React.useCallback(() => {
    dispatch({
      type: "SIGN_OUT",
    });

    Cookies.remove(cookieKey.token);
    window.localStorage.removeItem(cookieKey.user);
  }, [dispatch, cookieKey]);

  useIsomorphicLayoutEffect(() => {
    const serializeToken = Cookies.get(cookieKey.token);
    const serializeUser =
      window.localStorage.getItem(cookieKey.user) || undefined;

    if (
      typeof serializeToken !== "undefined" &&
      typeof serializeUser !== "undefined"
    ) {
      const parseToken = deserialize<AuthToken>(serializeToken);
      const parseUser = deserialize<User>(serializeUser);
      if (
        typeof parseToken !== "undefined" &&
        typeof parseUser !== "undefined"
      ) {
        dispatch({
          type: "SIGN_IN",
          props: {
            token: parseToken,
            user: parseUser,
          },
        });
        return;
      }
    }
    dispatch({ type: "SIGN_OUT" });
  }, [dispatch]);

  const authContextValues = React.useMemo<AuthContextValues>(
    () => ({
      signIn,
      signOut,
      status: state.status,
      token: state.token,
      user: state.user,
    }),
    [signIn, signOut, state],
  );

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
const resources = {
  cookieKey: {
    user: "current_user",
    token: "auth_token",
  },
};
