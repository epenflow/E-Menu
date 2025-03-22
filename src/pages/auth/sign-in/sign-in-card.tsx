import type React from "react";
import { cn } from "~/lib/utils";

type BaseSignInCard = React.ComponentProps<"div">;
export const SignInCard: React.FC<BaseSignInCard> = ({
  className,
  ...props
}) => {
  return (
    <div className="p-2 bg-accent border rounded-md max-w-md w-full mx-8 text-foreground z-10 relative">
      <div
        className={cn("bg-card border rounded-md w-full", className)}
        {...props}
      />
    </div>
  );
};

export const SignInCardHeader: React.FC<BaseSignInCard> = ({
  className,
  ...props
}) => {
  return <div className={cn("px-6 pt-6", className)} {...props} />;
};

export const SignInCardContent: React.FC<BaseSignInCard> = ({
  className,
  ...props
}) => {
  return <div className={cn("p-6", className)} {...props} />;
};
