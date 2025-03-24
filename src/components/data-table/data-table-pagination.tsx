import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type React from "react";
import { default as usePagination } from "~/hooks/pagination";
import type { Paginator } from "~/lib/types";
import type { FileRouteTypes } from "~/routeTree.gen";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import For from "../utils/for";

type DataTablePaginationProps = {
  meta: Paginator;
  routeId: FileRouteTypes["id"];
  limits?: number[];
};
const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  meta,
  routeId,
  limits = [10, 20, 30, 40, 50],
}) => {
  const {
    hasNextPage,
    hasPrevPage,
    onNextPage,
    onPrevPage,
    onFirstPage,
    onLastPage,
    limit,
    onLimitChange,
  } = usePagination(routeId, meta);

  return (
    <div className="flex items-center justify-end space-x-4 md:space-x-6 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select value={String(limit)} onValueChange={onLimitChange}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue>{limit}</SelectValue>
          </SelectTrigger>
          <SelectContent side="top">
            <For
              each={limits}
              children={(pageLimit) => (
                <SelectItem key={pageLimit} value={`${pageLimit}`}>
                  {pageLimit}
                </SelectItem>
              )}
            />
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center text-sm font-medium">
        Page {meta.currentPage} of {meta.lastPage}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onFirstPage}
          disabled={hasPrevPage}
          className="hidden size-8 p-0 lg:flex">
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onPrevPage}
          disabled={hasPrevPage}
          className="size-8 p-0">
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onNextPage}
          disabled={hasNextPage}
          className="size-8 p-0">
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onLastPage}
          disabled={hasNextPage}
          className="hidden size-8 p-0 lg:flex">
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
export default DataTablePagination;
