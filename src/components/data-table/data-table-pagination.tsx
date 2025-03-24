import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import useEventCallback from "~/hooks/event-callback";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import For from "../utils/for";
import { useDataTableContext } from "./data-table-context";

type DataTablePaginationProps = {
  pageSizes?: number[];
};
const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  pageSizes = [10, 20, 30, 40, 50],
}) => {
  const table = useDataTableContext();

  const onFirstPage = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      table.firstPage();
    },
  );
  const onPrevPage = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      table.previousPage();
    },
  );
  const onLastPage = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      table.setPageIndex(table.getPageCount());
    },
  );

  const onNextPage = useEventCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      table.nextPage();
    },
  );
  const setPerPage = React.useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table],
  );
  const hasPrevPage = React.useCallback(
    () => table.getState().pagination.pageIndex <= 1,
    [table],
  );
  const hasNextPage = React.useCallback(
    () => table.getState().pagination.pageIndex === table.getPageCount(),
    [table],
  );

  return (
    <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select onValueChange={setPerPage}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            <For
              each={pageSizes}
              children={(pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              )}
            />
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onFirstPage}
          disabled={hasPrevPage()}
          className="hidden size-8 p-0 lg:flex">
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onPrevPage}
          disabled={hasPrevPage()}
          className="size-8 p-0">
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onNextPage}
          disabled={hasNextPage()}
          className="size-8 p-0">
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onLastPage}
          disabled={hasNextPage()}
          className="hidden size-8 p-0 lg:flex">
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
export default DataTablePagination;
