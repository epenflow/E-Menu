import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useAppForm, useFormOnSubmitAsyncValidator } from "~/hooks/form";
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
    onSuccess: ({ data, message }) => {
      signIn(data);
      /**
       * @todo - Toast
       */
      if (message) {
        console.log(message);
      }
    },
  });
};

export const useSignInForm = () => {
  const signInMutation = useSignInMutation();
  const onSubmitAsync = useFormOnSubmitAsyncValidator(
    signInMutation.mutateAsync,
  );

  return useAppForm({
    defaultValues: {
      username: "",
      password: "",
    } as SignInSchema,
    validators: {
      onChange: signInSchema,
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 500,
      onSubmitAsync,
    },
  });
};
