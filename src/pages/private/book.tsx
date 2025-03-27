import { useSuspenseQuery } from "@tanstack/react-query";
import DataTable from "~/components/data-table/data-table";
import DataTableContainer from "~/components/data-table/data-table-container";
import DataTablePagination from "~/components/data-table/data-table-pagination";
import { DataTableProvider } from "~/components/data-table/data-table-provider";
import useFilters from "~/hooks/filters";
import PrivateContainer from "~/layouts/private/private-container";
import type { FileRouteTypes } from "~/routeTree.gen";
import { bookOptions } from "~/services/book";
import { bookColumns } from "~/services/book/column";

const routeId: FileRouteTypes["id"] = "/_private/book";
const Book = () => {
  const { onPaginationChange, paginationState, filters } = useFilters(routeId);
  const {
    data: { data: pagination },
  } = useSuspenseQuery(bookOptions(filters));

  return (
    <PrivateContainer>
      <DataTableProvider
        data={pagination.items}
        columns={bookColumns}
        rowCount={pagination.meta.total}
        state={{ pagination: paginationState }}
        onPaginationChange={onPaginationChange}>
        <div className="flex flex-col gap-2">
          <DataTableContainer>
            <DataTable isDevtools />
          </DataTableContainer>
          <DataTablePagination />
        </div>
      </DataTableProvider>
    </PrivateContainer>
  );
};
export default Book;
