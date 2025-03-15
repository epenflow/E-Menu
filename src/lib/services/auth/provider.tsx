import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React from "react";
import useIsomorphicLayoutEffect from "~/hooks/isomorphic-layout-effect";
import type { AuthToken } from "~/lib/types";
import { deserialize, serialize } from "~/lib/utils";
import { authCookiesKey } from "./constant";
import { AuthContext } from "./context";
import { AuthReducer } from "./state";
import {
  type AuthContextProviderProps,
  type AuthContextValues,
  type AuthReducerAction,
  type AuthReducerState,
  type CurrentUser,
  type SignInResponse,
} from "./type";

export const AuthContextProvider: AuthContextProviderProps = ({ children }) => {
  const query = useQueryClient();
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

      query.setQueryData([authCookiesKey.user], props.user);
      query.setQueryData([authCookiesKey.token], props.token);

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

      Cookies.set(authCookiesKey.token, serializedToken, options);
      window.localStorage.setItem(authCookiesKey.user, serializedUser);
    },
    [dispatch, query],
  );

  const signOut = React.useCallback(() => {
    dispatch({
      type: "SIGN_OUT",
    });

    query.clear();

    Cookies.remove(authCookiesKey.token);
    window.localStorage.removeItem(authCookiesKey.user);
  }, [dispatch, query]);

  const updateCurrentUser = React.useCallback(
    (user: CurrentUser) => {
      dispatch({
        type: "UPDATE_USER",
        props: user,
      });

      query.setQueryData([authCookiesKey.user], {
        ...state.user,
        ...user,
      });

      const serializedUser = serialize(user);
      window.localStorage.setItem(authCookiesKey.user, serializedUser);
    },
    [dispatch, query, state.user],
  );

  useIsomorphicLayoutEffect(() => {
    const serializeToken = Cookies.get(authCookiesKey.token);
    const serializeUser =
      window.localStorage.getItem(authCookiesKey.user) || undefined;

    if (
      typeof serializeToken !== "undefined" &&
      typeof serializeUser !== "undefined"
    ) {
      const parseToken = deserialize<AuthToken>(serializeToken);
      const parseUser = deserialize<CurrentUser>(serializeUser);
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

        query.setQueryData([authCookiesKey.user], parseUser);
        query.setQueryData([authCookiesKey.token], parseToken);
        return;
      }
    }
    dispatch({ type: "SIGN_OUT" });
  }, [dispatch, query]);

  const authContextValues = React.useMemo<AuthContextValues>(
    () => ({
      signIn,
      signOut,
      status: state.status,
      token: state.token,
      user: state.user,
      updateCurrentUser,
    }),
    [signIn, signOut, state, updateCurrentUser],
  );

  return <AuthContext value={authContextValues}>{children}</AuthContext>;
};
