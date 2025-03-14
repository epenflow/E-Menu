import * as z from "zod";
import type { AuthToken, Role, User } from "~/lib/types";
import type { signInSchema } from "./schema";

export type SignInResponse = {
  user: User<{ role: Role }>;
  token: AuthToken;
};
export type SignInSchema = z.infer<typeof signInSchema>;

export type AuthState = "AUTHENTICATED" | "UNAUTHENTICATED" | "PENDING";

export type AuthContextValues = {
  status: AuthState;
  signIn: (props: SignInResponse, expiresAt?: Date) => void;
  signOut: VoidFunction;
  user?: User<{ role: Role }>;
  token?: AuthToken;
};
export type AuthReducerState = {
  status: AuthState;
  user?: User<{ role: Role }>;
  token?: AuthToken;
};

export type AuthReducerAction =
  | { type: "SIGN_IN"; props: SignInResponse }
  | { type: "SIGN_OUT" }
  | { type: "PENDING" };
