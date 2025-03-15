import api, { apiToken } from "~/lib/api";
import type { User } from "~/lib/types";
import type { UpdateProfileSchema } from "./type";

export const updateProfileMutationFn = async (props: UpdateProfileSchema) => {
  const { data } = await api.patch<User>("/profile/update-profile", props, {
    headers: apiToken(),
    withCredentials: true,
  });

  return data;
};
