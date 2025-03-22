import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import React from "react";
import { serialize } from "~/lib/utils";
import { authCookiesKey } from "./constant";
import { AuthContext } from "./context";
import {
  getUserCredentials,
  removeUserCredentials,
  setUserCredentials,
} from "./helper";
import { useSignOutMutation } from "./hook";
import { AuthReducer } from "./state";
import {
  type AuthContextProviderProps,
  type AuthContextValues,
  type AuthReducerAction,
  type AuthReducerState,
  type CurrentUser,
  type SignInResponse,
} from "./type";

export const AuthContextProvider: AuthContextProviderProps = React.memo(
  ({ children }) => {
    const query = useQueryClient();
    const signOutMutation = useSignOutMutation();
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

        setUserCredentials({ token: props.token, user: props.user, expiresAt });
      },
      [dispatch, query],
    );

    const deleteUserCredentials = React.useCallback(() => {
      dispatch({
        type: "SIGN_OUT",
      });

      query.removeQueries({ queryKey: [authCookiesKey.user] });
      query.removeQueries({ queryKey: [authCookiesKey.token] });

      removeUserCredentials();
    }, [dispatch, query]);

    const signOut = React.useCallback(async () => {
      try {
        await signOutMutation.mutateAsync();
        deleteUserCredentials();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === HttpStatusCode.Unauthorized) {
            deleteUserCredentials();
          }
        }
      }
    }, [signOutMutation, deleteUserCredentials]);

    const updateCurrentUser = React.useCallback(
      (user: CurrentUser) => {
        dispatch({
          type: "UPDATE_USER",
          props: user,
        });

        query.setQueriesData(
          { queryKey: [authCookiesKey.user] },
          (currentUser?: CurrentUser) => ({ ...currentUser, ...user }),
        );

        const serializedUser = serialize(user);
        window.localStorage.setItem(authCookiesKey.user, serializedUser);
      },
      [dispatch, query],
    );

    React.useEffect(() => {
      const userCredentials = getUserCredentials();
      if (typeof userCredentials !== "undefined") {
        const { token, user } = userCredentials;
        dispatch({
          type: "SIGN_IN",
          props: {
            token,
            user,
          },
        });

        query.setQueryData([authCookiesKey.user], user);
        query.setQueryData([authCookiesKey.token], token);

        return;
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
        deleteUserCredentials,
        getUserCredentials,
        setUserCredentials,
        removeUserCredentials,
      }),
      [signIn, signOut, state, updateCurrentUser, deleteUserCredentials],
    );

    return <AuthContext value={authContextValues}>{children}</AuthContext>;
  },
);
AuthContextProvider.displayName = "AuthContextProvider";
