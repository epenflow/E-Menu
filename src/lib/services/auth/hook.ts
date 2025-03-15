import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useAppForm } from "~/hooks/form";
import type {
  ApiErrorResponse,
  OnSubmitAsyncValidatorProps,
} from "~/lib/types";
import { authQueryKey } from "./constant";
import { AuthContext } from "./context";
import { signInMutationFn } from "./query";
import { signInSchema } from "./schema";
import type { SignInSchema } from "./type";

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (typeof context === "undefined")
    throw new Error("useAuth should be used within <AuthContextProvider/>");

  return context;
};

const useSignInMutation = () => {
  const { signIn } = useAuth();

  return useMutation({
    mutationKey: authQueryKey.signIn,
    mutationFn: signInMutationFn,
    onSuccess: (data) => {
      signIn(data);
    },
  });
};

export const useSignInForm = () => {
  const { mutateAsync } = useSignInMutation();

  const onSubmitAsync = React.useCallback(
    async (
      props: OnSubmitAsyncValidatorProps<SignInSchema>,
    ): Promise<{ fields: unknown } | undefined> => {
      try {
        await mutateAsync(props.value);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { errors }: ApiErrorResponse<{ field?: string }> =
            error.response.data;
          const fields = Object.create(null);

          errors.forEach(({ field, message }) => {
            const responses = [{ message }];

            if (field) {
              fields[field] = responses;
            } else {
              fields["username"] = responses;
              fields["password"] = responses;
            }
          });

          return { fields };
        }
      }
      return undefined;
    },
    [mutateAsync],
  );

  return useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 500,
      onSubmitAsync,
    },
  });
};
