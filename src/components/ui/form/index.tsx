import React from "react";
import { useFormContext } from "~/hooks/form";
import { cn } from "~/lib/utils";

type FormMessage = React.ComponentProps<"p">;
export const FormMessage: React.FC<FormMessage> = ({ className, ...props }) => {
  const field = useFormContext();

  return (
    <field.Subscribe
      selector={(state) => [state.errorMap]}
      children={([errorMap]) =>
        errorMap.onSubmit ? (
          <p
            className={cn(
              "text-[0.8rem] font-medium text-destructive",
              className,
            )}
            {...props}>
            {errorMap.onSubmit?.toString()}
          </p>
        ) : null
      }
    />
  );
};
