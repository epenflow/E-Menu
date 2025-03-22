import { useMutation } from "@tanstack/react-query";
import React from "react";
import {
  useAppForm,
  useFormHookOnSubmitAsyncValidator,
} from "~/hooks/form-hook";
import { apiSignIn, apiSignOut } from "./api";
import { authQueryKey } from "./constant";
import { AuthContext } from "./context";
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
    mutationFn: apiSignIn,
    onSuccess: ({ data, message }) => {
      console.log(data);
      if (typeof data !== "undefined") {
        signIn(data);
      }
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
  const onSubmitAsync = useFormHookOnSubmitAsyncValidator(
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

export const useSignOutMutation = () => {
  return useMutation({
    mutationKey: authQueryKey.signOut,
    mutationFn: apiSignOut,
  });
};
