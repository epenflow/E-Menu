import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

const RouterPending = () => {
  return (
    <section
      className={cn(
        "w-full h-dvh",
        "fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
        "z-[9999] bg-card text-muted-foreground",
        "inline-flex items-center justify-center",
      )}>
      <Loader2 size={50} className="animate-spin" />
    </section>
  );
};
export default RouterPending;
