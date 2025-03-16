import api, { apiToken } from "~/lib/api";
import type { ApiSuccessResponse, User } from "~/lib/types";
import type { UpdatePasswordSchema, UpdateProfileSchema } from "./type";

export const updateProfileMutationFn = async (props: UpdateProfileSchema) => {
  const { data } = await api.patch<ApiSuccessResponse<User>>(
    "/profile/update-profile",
    props,
    {
      headers: apiToken(),
      withCredentials: true,
    },
  );

  return data;
};

export const updatePasswordMutationFn = async (props: UpdatePasswordSchema) => {
  const { data } = await api.patch("/profile/update-password", props, {
    headers: apiToken(),
    withCredentials: true,
  });

  return data;
};
