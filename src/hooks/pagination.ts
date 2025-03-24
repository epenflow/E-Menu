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
  routeId: RouteGen.FileRouteTypes["id"],
  paginator: Paginator,
): {
  limit: number;
  onLimitChange: (value: string) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setOrder: OrderFunction;
  onNextPage: EventFunction;
  onPrevPage: EventFunction;
  onFirstPage: EventFunction;
  onLastPage: EventFunction;
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

  const onLimitChange = React.useCallback(
    (value: string) => {
      navigate({
        search: () => ({
          page: pagination.page,
          limit: Number(value),
        }),
      });
    },
    [pagination.page, navigate],
  );

  const onNextPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({
        search: () => ({
          page: hasNextPage ? paginator.lastPage : pagination.page + 1,
          limit: pagination.limit,
        }),
      });
    },
  );

  const onPrevPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({
        search: () => ({
          page: hasPrevPage ? paginator.firstPage : pagination.page - 1,
          limit: pagination.limit,
        }),
      });
    },
  );

  const onFirstPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({
        search: () => ({
          page: paginator.firstPage,
          limit: pagination.limit,
        }),
      });
    },
  );

  const onLastPage = useEventCallback(
    <T = HTMLElement>(e: React.MouseEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({
        search: () => ({
          page: paginator.lastPage,
          limit: pagination.limit,
        }),
      });
    },
  );

  return {
    limit: pagination.limit,
    onLimitChange,
    hasNextPage,
    hasPrevPage,
    setOrder,
    onNextPage,
    onPrevPage,
    onFirstPage,
    onLastPage,
  };
};
export default usePagination;
