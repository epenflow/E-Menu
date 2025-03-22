import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import PrivateContainer from "~/layouts/private/private-container";
import { allRoleQueryOptions } from "~/lib/services/role";
import type { Role } from "~/lib/types";

const Role = () => {
  const { routeApi } = resources;
  const {
    data: { data: pagination },
  } = useSuspenseQuery(allRoleQueryOptions(routeApi.useSearch()));

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
const resources = {
  routeApi: getRouteApi("/_private/role"),
};

export interface Artwork {
  artist: string;
  art: string;
}
