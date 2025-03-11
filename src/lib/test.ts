import { queryOptions } from "@tanstack/react-query";

import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { paginationSchema, type PaginationSchema } from "~/hooks/pagination";
import http from "./http";
import type { PaginateResponse } from "./types";

export const paginateProductQueryFn = async (ctx: QueryFunctionContext) => {
  const params = paginationSchema.parse(ctx.meta);
  const { data } = await http.get<
    PaginateResponse<
      {
        id: string;
        title: string;
        genre: string;
        createdAt: string;
        updatedAt: string;
      }[]
    >
  >("products", { params });

  return data;
};

const productQueryKey = createQueryKeys("product", {
  paginate: (ctx: PaginationSchema) => {
    return {
      queryKey: [ctx.page],
      queryFn: paginateProductQueryFn,
    };
  },
});

export const productsQueryOptions = (ctx: PaginationSchema) => {
  return queryOptions({
    ...productQueryKey.paginate(ctx),
    meta: ctx,
    staleTime: 1000 * 60,
  });
};
