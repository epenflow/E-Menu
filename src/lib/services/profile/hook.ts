import { useMutation } from "@tanstack/react-query";
import {
  useAppForm,
  useFormHookOnSubmitAsyncValidator,
} from "~/hooks/form-hook";
import { useAuth } from "../auth";
import { apiUpdateProfile, apiUpdateProfilePassword } from "./api";
import { updatePasswordSchema, updateProfileSchema } from "./schema";
import type { UpdatePasswordSchema, UpdateProfileSchema } from "./type";

const useUpdateProfileMutation = () => {
  const { user, updateCurrentUser } = useAuth();
  /**
   * @todo - toast success message
   */
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: apiUpdateProfile,
    onSuccess: ({ data }) => {
      if (typeof data !== "undefined") {
        updateCurrentUser({
          ...data,
          role: user!.role,
        });
      }
    },
  });
};

export const useUpdateProfileForm = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfileMutation();
  const onSubmitAsync = useFormHookOnSubmitAsyncValidator(
    updateProfileMutation.mutateAsync,
  );

  return useAppForm({
    defaultValues: {
      fName: user?.fName || "",
      lName: user?.lName || "",
      username: user?.username || "",
      email: user?.email || "",
    } as UpdateProfileSchema,
    validators: {
      onChange: updateProfileSchema,
      onChangeAsync: updateProfileSchema,
      onChangeAsyncDebounceMs: 500,
      onSubmitAsync,
    },
  });
};

const useUpdatePasswordMutation = () => {
  /**
   * @todo - toast success message
   */

  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: apiUpdateProfilePassword,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const useUpdatePasswordForm = () => {
  const updatePasswordMutation = useUpdatePasswordMutation();
  const onSubmitAsync = useFormHookOnSubmitAsyncValidator(
    updatePasswordMutation.mutateAsync,
  );

  return useAppForm({
    defaultValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    } as UpdatePasswordSchema,
    validators: {
      onChange: updatePasswordSchema,
      onChangeAsync: updatePasswordSchema,
      onChangeAsyncDebounceMs: 500,
      onSubmitAsync,
    },
  });
};
