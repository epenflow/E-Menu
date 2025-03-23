import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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

  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: apiUpdateProfile,
    onSuccess: async ({ data, message }) => {
      toast.success(message);
      setTimeout(() => {
        if (typeof data !== "undefined") {
          updateCurrentUser({
            ...data,
            role: user!.role,
          });
        }
      }, 0.5 * 1000);
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
    onSuccess: ({ message }) => {
      toast.success(message);
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
