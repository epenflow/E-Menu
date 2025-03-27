import { queryOptions } from "@tanstack/react-query";
import type { FilterSchema } from "~/hooks/filters";
import { roleQueryKey } from "./api";

export const allRoleQueryOptions = (ctx: FilterSchema) => {
  return queryOptions({
    ...roleQueryKey.all(ctx),
    meta: ctx,
    staleTime: 1000 * 60 * 60,
  });
};
