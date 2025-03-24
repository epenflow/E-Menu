import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useSidebar } from "~/hooks/sidebar";
import { cn } from "~/lib/utils";

type PrivateContainerProps = {
  scrollable?: boolean;
  children?: React.ReactNode;
};
const PrivateContainer: React.FC<PrivateContainerProps> = ({
  scrollable = true,
  children,
}) => {
  const { variant } = useSidebar();
  const jsxToDisplay = React.useMemo(
    () => (
      <div className="@container/main flex flex-1 flex-col p-4">{children}</div>
    ),
    [children],
  );

  if (scrollable) {
    return (
      <ScrollArea
        className={cn("overflow-hidden", {
          "max-h-private-container h-private-container": variant === "sidebar",
          "md:max-h-private-container-inset md:h-private-container-inset h-private-container max-h-private-container":
            variant === "inset",
        })}>
        {jsxToDisplay}
      </ScrollArea>
    );
  }
  return jsxToDisplay;
};
export default PrivateContainer;
