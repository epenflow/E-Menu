import { Loader2 } from "lucide-react";

const Pending = () => {
  return (
    <div className="h-dvh w-full flex items-center justify-center bg-card z-[99999] fixed left-0 top-0">
      <Loader2 size={50} className="text-muted-foreground animate-spin" />
    </div>
  );
};
export default Pending;
