import { Slot } from "@radix-ui/react-slot";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { useFieldContext } from "~/hooks/form";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../button";
import { Label, type LabelProps } from "../label";

type FieldItemContextValues = {
  id: string;
  name: string;
  hasError: boolean;
  errors: StandardSchemaV1Issue[];
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
};
const FieldItemContext = React.createContext<
  FieldItemContextValues | undefined
>(undefined);

const useFieldItemContext = () => {
  const context = React.useContext(FieldItemContext);

  if (typeof context === "undefined")
    throw new Error(
      "useFieldItemContext should be used within <FieldItemContext/>",
    );

  return context;
};

type FieldItemProps = React.ComponentProps<"div">;
export const FieldItem: React.FC<FieldItemProps> = ({
  className,
  ...props
}) => {
  const field = useFieldContext();
  const id = React.useId();

  const fieldItemContextValues = React.useMemo<FieldItemContextValues>(
    () => ({
      id,
      name: field.name,
      hasError: field.state.meta.errors.length > 0,
      errors: field.state.meta.errors,
      formItemId: `${id}-${field.name}-item`,
      formDescriptionId: `${id}-${field.name}-description`,
      formMessageId: `${id}-${field.name}-message`,
    }),
    [id, field.name, field.state.meta.errors],
  );

  return (
    <FieldItemContext value={fieldItemContextValues}>
      <div
        id={`${id}-${field.name}`}
        className={cn("space-y-2", className)}
        {...props}
      />
    </FieldItemContext>
  );
};

export const FieldLabel: React.FC<LabelProps> = ({ className, ...props }) => {
  const { hasError, formItemId } = useFieldItemContext();
  return (
    <Label
      htmlFor={formItemId}
      className={cn(hasError && "text-destructive", className)}
      {...props}
    />
  );
};

type FieldControlProps = React.ComponentProps<typeof Slot>;
export const FieldControl: React.FC<FieldControlProps> = ({ ...props }) => {
  const { hasError, formItemId } = useFieldItemContext();

  return (
    <Slot
      id={formItemId}
      aria-describedby={hasError ? `${formItemId}-error` : formItemId}
      aria-invalid={hasError}
      {...props}
    />
  );
};

type FieldMessage = React.ComponentProps<"p">;
export const FieldMessage: React.FC<FieldMessage> = ({
  className,
  ...props
}) => {
  const { hasError, errors, formMessageId } = useFieldItemContext();

  return hasError ? (
    <p
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {errors.map((error) => error.message).join(", ")}
    </p>
  ) : null;
};

type FieldDescription = React.ComponentProps<"p">;
export const FieldDescription: React.FC<FieldDescription> = ({
  className,
  ...props
}) => {
  const { formDescriptionId } = useFieldItemContext();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
};

type FieldControlWithIconProps = React.ComponentProps<"div"> & {
  Icon: LucideIcon;
};
export const FieldControlWithIcon: React.FC<FieldControlWithIconProps> = ({
  className,
  Icon,
  children,
  ...props
}) => {
  const { hasError, id, name } = useFieldItemContext();

  return (
    <div
      id={`${id}-${name}-field-with-icon`}
      className={cn("relative", className)}
      {...props}>
      <div
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "hover:bg-transparent",
          "absolute top-0 left-0 px-3 py-2 h-full inline-flex items-center justify-center",
          hasError && "text-destructive",
        )}>
        <Icon size={12} className="size-4" />
      </div>
      <Slot className={"pl-9"}>{children}</Slot>
    </div>
  );
};
