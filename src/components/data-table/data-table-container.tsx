import type React from "react";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar, type ScrollAreaProps } from "../ui/scroll-area";

type DataTableContainer = ScrollAreaProps;
const DataTableContainer: React.FC<DataTableContainer> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ScrollArea
      className={cn("w-full overflow-auto rounded-md border", className)}
      {...props}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DataTableContainer;
