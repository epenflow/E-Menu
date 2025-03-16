import { useMutation } from "@tanstack/react-query";
import { useAppForm, useFormOnSubmitAsyncValidator } from "~/hooks/form";
import { useAuth } from "../auth";
import { updatePasswordMutationFn, updateProfileMutationFn } from "./query";
import { updatePasswordSchema, updateProfileSchema } from "./schema";
import type { UpdatePasswordSchema, UpdateProfileSchema } from "./type";

const useUpdateProfileMutation = () => {
  const { user, updateCurrentUser } = useAuth();
  /**
   * @todo - toast success message
   */
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfileMutationFn,
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
  const onSubmitAsync = useFormOnSubmitAsyncValidator(
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
    mutationFn: updatePasswordMutationFn,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const useUpdatePasswordForm = () => {
  const updatePasswordMutation = useUpdatePasswordMutation();
  const onSubmitAsync = useFormOnSubmitAsyncValidator(
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
