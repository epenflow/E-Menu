import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useAppForm } from "~/hooks/form";
import { AuthContext } from "./context";
import { signInMutationFn } from "./query";
import { signInSchema } from "./schema";

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (typeof context === "undefined")
    throw new Error("useAuth should be used within <AuthContextProvider/>");

  return context;
};

const useSignInMutation = () => {
  const { signIn, signOut } = useAuth();

  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInMutationFn,
    onSuccess: (data) => {
      signIn(data);
    },
    onError: () => {
      signOut();
    },
  });
};

export const useSignInForm = () => {
  const { mutateAsync } = useSignInMutation();

  return useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: signInSchema,
      onChangeAsync: signInSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: async (props) => {
      try {
        await mutateAsync(props.value);
      } catch (error) {
        console.log(error);
      }
    },
  });
};
