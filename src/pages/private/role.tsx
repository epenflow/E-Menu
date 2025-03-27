import { useSuspenseQuery } from "@tanstack/react-query";
import DataTable from "~/components/data-table/data-table";
import DataTableContainer from "~/components/data-table/data-table-container";
import DataTablePagination from "~/components/data-table/data-table-pagination";
import { DataTableProvider } from "~/components/data-table/data-table-provider";
import { Block, Heading, Text } from "~/components/ui/typography";
import useFilters from "~/hooks/filters";
import PrivateContainer from "~/layouts/private/private-container";
import type { Role } from "~/lib/types";
import type { FileRouteTypes } from "~/routeTree.gen";
import { allRoleQueryOptions, roleColumns } from "~/services/role";

const routeId: FileRouteTypes["id"] = "/_private/role";
const Role = () => {
  const { onPaginationChange, filters, paginationState } = useFilters(routeId);
  const {
    data: { data: pagination },
  } = useSuspenseQuery(allRoleQueryOptions(filters));

  return (
    <PrivateContainer>
      <div className="flex flex-col gap-4 md:gap-6">
        <Block className="gap-1">
          <Heading level={3} className="font-medium">
            Role Management
          </Heading>
          <Text>Manage user roles and permissions within the application.</Text>
        </Block>

        <DataTableProvider
          data={pagination.items}
          columns={roleColumns}
          state={{ pagination: paginationState }}
          onPaginationChange={onPaginationChange}
          rowCount={pagination.meta.total}>
          <div className="flex flex-col gap-2">
            <DataTableContainer>
              <DataTable />
            </DataTableContainer>
            <DataTablePagination />
          </div>
        </DataTableProvider>
      </div>
    </PrivateContainer>
  );
};
export default Role;
