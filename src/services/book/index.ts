import { queryOptions, type QueryFunctionContext } from "@tanstack/react-query";
import { filterSchema, type FilterSchema } from "~/hooks/filters";
import api, { apiConfigWithCredentials } from "~/lib/api";
import type { ApiSuccessResponse, PaginateResponse } from "~/lib/types";

export type Book = {
  id: number;
  name: string;
  author: string;
  genre: string;
  publisher: string;
  createdAt: Date;
  updatedAt: Date;
};
const apiBooks = async (ctx: QueryFunctionContext) => {
  const params = filterSchema.parse(ctx.meta);

  const { data } = await api.get<ApiSuccessResponse<PaginateResponse<Book[]>>>(
    "/books",
    {
      params,
      ...apiConfigWithCredentials(),
    },
  );
  return data;
};

export const bookOptions = (ctx: FilterSchema) => {
  return queryOptions({
    queryKey: ["books", ctx],
    queryFn: apiBooks,
    meta: ctx,
  });
};
