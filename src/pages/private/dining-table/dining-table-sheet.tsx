import type React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

type DiningTableSheetProps = {
  children: React.ReactNode;
};
const DiningTableSheet: React.FC<DiningTableSheetProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default DiningTableSheet;
