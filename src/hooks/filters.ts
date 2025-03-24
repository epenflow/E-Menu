import { getRouteApi } from "@tanstack/react-router";
import type { PaginationState, Updater } from "@tanstack/react-table";
import { fallback } from "@tanstack/zod-adapter";
import React from "react";
import * as z from "zod";
import type { FileRouteTypes } from "~/routeTree.gen";

export const filterSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  perPage: fallback(z.number(), 10).default(10),
});
export type FilterSchema = z.infer<typeof filterSchema>;

const useFilters = (routeId: FileRouteTypes["id"]) => {
  const routeApi = getRouteApi(routeId);
  const navigate = routeApi.useNavigate();
  const filters = filterSchema.parse(routeApi.useSearch());

  const paginationState = React.useMemo<PaginationState>(
    () => ({
      pageIndex: filters.page,
      pageSize: filters.perPage,
    }),
    [filters],
  );

  const onPaginationChange = React.useCallback(
    (updater: Updater<PaginationState>) => {
      if (typeof updater === "function") {
        navigate({
          search: {
            page:
              updater(paginationState).pageIndex <= 1
                ? 1
                : updater(paginationState).pageIndex,
            perPage: updater(paginationState).pageSize,
          },
        });
      } else {
        navigate({
          search: {
            page: updater.pageIndex,
            perPage: updater.pageSize,
          },
        });
      }
    },
    [navigate, paginationState],
  );

  return {
    onPaginationChange,
    paginationState,
    filters,
  };
};
export default useFilters;
