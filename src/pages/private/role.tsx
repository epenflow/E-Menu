import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import PrivateContainer from "~/layouts/private/private-container";
import type { Role } from "~/lib/types";

const Role = () => {
  return (
    <PrivateContainer>
      <div className="w-full h-auto flex gap-2 flex-col overflow-x-hidden">
        <div className="flex w-full items-center justify-end">
          <Button className="w-auto" size="sm" variant="outline">
            <PlusIcon />
            <span>Role</span>
          </Button>
        </div>
      </div>
    </PrivateContainer>
  );
};
export default Role;
