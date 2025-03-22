import api, { apiConfigWithCredentials } from "~/lib/api";
import type { ApiSuccessResponse, User } from "~/lib/types";
import type { UpdatePasswordSchema, UpdateProfileSchema } from "./type";

export const apiUpdateProfile = async (props: UpdateProfileSchema) => {
  const { data } = await api.patch<ApiSuccessResponse<User>>(
    "/profile/update-profile",
    props,
    apiConfigWithCredentials(),
  );

  return data;
};

export const apiUpdateProfilePassword = async (props: UpdatePasswordSchema) => {
  const { data } = await api.patch(
    "/profile/update-password",
    props,
    apiConfigWithCredentials(),
  );

  return data;
};
