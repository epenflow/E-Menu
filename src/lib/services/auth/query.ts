import api from "../../api";
import type { SignInResponse, SignInSchema } from "./type";

export const signInMutationFn = async (props: SignInSchema) => {
  const { data } = await api.post<SignInResponse>("/auth/sign-in", {
    ...props,
  });

  return data;
};
