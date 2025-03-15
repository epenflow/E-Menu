import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppForm } from "~/hooks/form";
import type { ApiErrorResponse } from "~/lib/types";
import { useAuth } from "../auth";
import { updateProfileMutationFn } from "./query";
import { updateProfileSchema } from "./schema";

const useUpdateProfileMutation = () => {
  const { user, updateCurrentUser } = useAuth();
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfileMutationFn,
    onSuccess: (data) => {
      updateCurrentUser({
        ...data,
        role: user!.role,
      });
    },
  });
};

export const useUpdateProfileForm = () => {
  const { user } = useAuth();
  const { mutateAsync } = useUpdateProfileMutation();

  return useAppForm({
    defaultValues: {
      fName: user?.fName || "",
      lName: user?.lName || "",
      username: user?.username || "",
      email: user?.email || "",
    },
    validators: {
      onChange: updateProfileSchema,
      onChangeAsync: updateProfileSchema,
      onChangeAsyncDebounceMs: 500,
      onSubmitAsync: async (props) => {
        try {
          await mutateAsync(props.value);
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            const { errors }: ApiErrorResponse<{ field?: string }> =
              error.response.data;
            const fields = Object.create(null);

            errors.forEach(({ message, field }) => {
              const response = [{ message }];
              if (field) {
                fields[field] = response;
              }
            });

            return { fields };
          }
        }
        return undefined;
      },
    },
  });
};
