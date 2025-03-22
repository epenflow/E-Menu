import type React from "react";
import { ScrollArea, type ScrollAreaProps } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

type AppInsetProps = ScrollAreaProps;
const AppInset: React.FC<AppInsetProps> = ({ className, ...props }) => {
  return <ScrollArea className={cn("h-app-container", className)} {...props} />;
};
export default AppInset;
