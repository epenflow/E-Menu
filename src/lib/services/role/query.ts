import { queryOptions } from "@tanstack/react-query";
import type { PaginationSchema } from "~/hooks/pagination";
import { roleQueryKey } from "./api";

export const allRoleQueryOptions = (ctx: PaginationSchema) => {
  return queryOptions({
    ...roleQueryKey.all(ctx),
    meta: ctx,
    staleTime: 1000 * 60 * 60,
  });
};
