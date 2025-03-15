import React from "react";
import * as z from "zod";
import type { AuthToken, Role, User } from "~/lib/types";
import type { signInSchema } from "./schema";

export type CurrentUser = User<{ role: Role }>;
export type SignInResponse = {
  user: CurrentUser;
  token: AuthToken;
};
export type SignInSchema = z.infer<typeof signInSchema>;

export type AuthState =
  | "AUTHENTICATED"
  | "UNAUTHENTICATED"
  | "PENDING"
  | "UPDATE_USER";

export type AuthContextValues = {
  status: AuthState;
  signIn: (props: SignInResponse, expiresAt?: Date) => void;
  signOut: VoidFunction;
  updateCurrentUser: (user: CurrentUser) => void;
  user?: CurrentUser;
  token?: AuthToken;
};
export type AuthReducerState = {
  status: AuthState;
  user?: CurrentUser;
  token?: AuthToken;
};

export type AuthReducerAction =
  | { type: "SIGN_IN"; props: SignInResponse }
  | { type: "SIGN_OUT" }
  | { type: "PENDING" }
  | { type: "UPDATE_USER"; props: CurrentUser };

export type AuthContextProviderProps = React.FC<React.PropsWithChildren>;
