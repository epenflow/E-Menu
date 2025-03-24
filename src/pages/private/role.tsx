import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import DataTable from "~/components/data-table/data-table";
import DataTableContainer from "~/components/data-table/data-table-container";
import DataTablePagination from "~/components/data-table/data-table-pagination";
import { Button } from "~/components/ui/button";
import { Block, Heading, Text } from "~/components/ui/typography";
import PrivateContainer from "~/layouts/private/private-container";
import { allRoleQueryOptions, roleColumns } from "~/lib/services/role";
import type { Role } from "~/lib/types";
import type { FileRouteTypes } from "~/routeTree.gen";

const routeId: FileRouteTypes["id"] = "/_private/role";
const route = getRouteApi(routeId);
const Role = () => {
  const search = route.useSearch();
  const {
    data: { data: pagination },
  } = useSuspenseQuery(allRoleQueryOptions(search));

  return (
    <PrivateContainer>
      <div className="flex flex-col gap-4 md:gap-6">
        <Block className="gap-1">
          <Heading level={3} className="font-medium">
            Role Management
          </Heading>
          <Text>Manage user roles and permissions within the application.</Text>
        </Block>
        <div className="flex flex-col gap-2">
          <div>
            <Button size="sm" variant="ghost" className="border border-dashed">
              <PlusIcon />
              <span>New Role</span>
            </Button>
          </div>

          <DataTableContainer>
            <DataTable data={pagination.items} columns={roleColumns} />
          </DataTableContainer>

          <DataTablePagination routeId={routeId} meta={pagination.meta} />
        </div>
      </div>
    </PrivateContainer>
  );
};
export default Role;
