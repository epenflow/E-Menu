import React from "react";
import { useFormContext, useFormHookOnSubmit } from "~/hooks/form-hook";
import { cn } from "~/lib/utils";

type FormContainerProps = React.ComponentProps<"form">;
const FormContainer: React.FC<FormContainerProps> = ({
  className,
  ...props
}) => {
  const form = useFormContext();
  const onSubmit = useFormHookOnSubmit(form.handleSubmit);

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-2", className)}
      {...props}
    />
  );
};
export default FormContainer;
