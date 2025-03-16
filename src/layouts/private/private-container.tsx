import type React from "react";
import { ScrollArea, type ScrollAreaProps } from "~/components/ui/scroll-area";
import { useSidebar } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

type PrivateContainerProps = React.FC<
  ScrollAreaProps & {
    scrollable?: boolean;
  }
>;
const PrivateContainer: PrivateContainerProps = ({
  scrollable = true,
  className,
  ...props
}) => {
  const { variant } = useSidebar();
  if (scrollable) {
    return (
      <ScrollArea
        className={cn(
          "px-4",
          {
            "max-h-private-container h-private-container":
              variant === "sidebar",
            "md:max-h-private-container-inset md:h-private-container-inset h-private-container max-h-private-container":
              variant === "inset",
          },
          className,
        )}
        {...props}
      />
    );
  }

  return <div className={className} {...props} />;
};
export default PrivateContainer;
