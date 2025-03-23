import { CircleAlert } from "lucide-react";
import React from "react";
import { useFormContext } from "~/hooks/form-hook";
import { cn } from "~/lib/utils";

type FormMessage = React.ComponentProps<"p"> & {
  showIcon?: boolean;
};
const FormMessage: React.FC<FormMessage> = ({
  className,
  showIcon = true,
  ...props
}) => {
  const field = useFormContext();

  return (
    <field.Subscribe
      selector={(state) => [state.errorMap]}
      children={([errorMap]) =>
        errorMap.onSubmit ? (
          showIcon ? (
            <div className="flex items-center gap-1.5 text-destructive">
              <CircleAlert className="size-4" />
              <p
                className={cn(
                  "text-[0.8rem] font-medium text-destructive",
                  className,
                )}
                {...props}>
                {errorMap.onSubmit?.toString()}
              </p>
            </div>
          ) : (
            <p
              className={cn(
                "text-[0.8rem] font-medium text-destructive",
                className,
              )}
              {...props}>
              {errorMap.onSubmit?.toString()}
            </p>
          )
        ) : null
      }
    />
  );
};
export default FormMessage;
