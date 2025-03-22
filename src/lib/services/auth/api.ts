import type { ApiSuccessResponse } from "~/lib/types";
import api, { apiToken } from "../../api";
import type { SignInResponse, SignInSchema } from "./type";

export const apiSignIn = async (props: SignInSchema) => {
  const { data } = await api.post<ApiSuccessResponse<SignInResponse>>(
    "/auth/sign-in",
    {
      ...props,
    },
  );

  return data;
};

export const apiSignOut = async () => {
  const { data } = await api.post<ApiSuccessResponse>("/auth/sign-out", null, {
    headers: apiToken(),
    withCredentials: true,
  });

  return data;
};
