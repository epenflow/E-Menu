import { getRouteApi } from "@tanstack/react-router";
import React from "react";
import * as RouteGen from "~/routeTree.gen";

import { fallback } from "@tanstack/zod-adapter";
import * as z from "zod";
import type { Paginator } from "~/lib/types";
import useEventCallback from "./event-callback";

type Order = "asc" | "desc";
type OrderFunction = (order: Order) => void;
type EventFunction<T = HTMLElement> =
  | ((e: React.MouseEvent<T>) => void)
  | undefined;
export const paginationSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  limit: fallback(z.number(), 10).default(10),
  order: fallback(z.enum(["desc", "asc"]), "asc").default("asc"),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;

const usePagination = (
  routeId: RouteGen.FileRouteTypes["to"],
  paginator: Paginator,
): {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setNextPage: VoidFunction;
  setPrevPage: VoidFunction;
  setOrder: OrderFunction;
  handleNextPage: EventFunction;
  handlePrevPage: EventFunction;
} => {
  const routeApi = React.useMemo(() => getRouteApi(routeId), [routeId]);
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const pagination = React.useMemo(
    () => paginationSchema.parse(search),
    [search],
  );
  const hasPrevPage = React.useMemo(
    () => paginator.previousPageUrl === null,
    [paginator.previousPageUrl],
  );
  const hasNextPage = React.useMemo(
    () => paginator.nextPageUrl === null,
    [paginator.nextPageUrl],
  );

  const setNextPage = React.useCallback(() => {
    navigate({
      search: () => ({
        page: hasNextPage ? paginator.lastPage : pagination.page + 1,
      }),
    });
  }, [pagination.page, navigate, hasNextPage, paginator.lastPage]);

  const setPrevPage = React.useCallback(() => {
    navigate({
      search: () => ({
        page: hasPrevPage ? paginator.firstPage : pagination.page - 1,
      }),
    });
  }, [pagination.page, navigate, hasPrevPage, paginator.firstPage]);

  const setOrder = React.useCallback(
    (order: Order) => {
      navigate({
        search: {
          order,
        },
      });
    },
    [navigate],
  );

  const handleNextPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      setNextPage();
    },
  );

  const handlePrevPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      setPrevPage();
    },
  );

  return {
    hasNextPage,
    hasPrevPage,
    setNextPage,
    setPrevPage,
    setOrder,
    handleNextPage,
    handlePrevPage,
  };
};
export default usePagination;
