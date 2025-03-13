import { formOptions } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { useAppForm } from "~/hooks/form";
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required!").email(),
  password: z.string().min(1, "Password is required!"),
});
export type SignInSchema = z.infer<typeof signInSchema>;

const signInMutationFn = async (props: SignInSchema) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log(props);
      const errors = [
        {
          path: "Password",
          message: "Invalid credentials",
        },
      ];
      reject(new Error(JSON.stringify(errors)));
    }, 1000 * 1);
  });
};

export const useSignInMutation = () =>
  useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInMutationFn,
  });
const signInFormOptions = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onChange: signInSchema,
    onChangeAsync: signInSchema,
    onChangeAsyncDebounceMs: 500,
  },
});

export const useSignInForm = () => {
  const { mutateAsync } = useSignInMutation();

  /**
   * @todo - handling server error
   */

  return useAppForm({
    ...signInFormOptions,
    onSubmit: async (props) => {
      try {
        await mutateAsync(props.value);
      } catch (error) {
        console.log(error);
      }
    },
  });
};
