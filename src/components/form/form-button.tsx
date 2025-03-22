import type React from "react";
import { useFormContext } from "~/hooks/form-hook";
import { Button, type ButtonProps } from "../ui/button";

type FormButtonProps<T = { isPending: boolean }> = Omit<
  ButtonProps,
  "children"
> & {
  children: (props: T) => React.ReactNode;
};

const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <Button disabled={!canSubmit} isPending={isSubmitting} {...props}>
          {children({ isPending: isSubmitting })}
        </Button>
      )}
    />
  );
};
export default FormButton;
