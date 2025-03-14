import { createQueryKeys } from "@lukemorales/query-key-factory";
import { queryOptions } from "@tanstack/react-query";
import type { PaginationSchema } from "~/hooks/pagination";
import { allRoleQueryFn } from "./query";

const roleQueryKey = createQueryKeys("role", {
  all: (ctx: PaginationSchema) => ({
    queryKey: [ctx.page],
    queryFn: allRoleQueryFn,
  }),
});

export const allRoleQueryOptions = (ctx: PaginationSchema) => {
  return queryOptions({
    ...roleQueryKey.all(ctx),
    meta: ctx,
  });
};
