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

export type AuthState = "AUTHENTICATED" | "UNAUTHENTICATED" | "PENDING";

export type AuthContextValues = {
  status: AuthState;
  signIn: (props: SignInResponse, expiresAt?: Date) => void;
  signOut: VoidFunction;
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
  | { type: "PENDING" };

export type AuthContextProviderProps = React.FC<React.PropsWithChildren>;
