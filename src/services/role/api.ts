import { createQueryKeys } from "@lukemorales/query-key-factory";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { filterSchema, type FilterSchema } from "~/hooks/filters";
import api, { apiConfigWithCredentials } from "~/lib/api";
import type { ApiSuccessResponse } from "~/lib/types";
import type { AllRoleResponse } from "./type";

export const allRoleQueryFn = async (
  ctx: QueryFunctionContext,
): Promise<ApiSuccessResponse<AllRoleResponse>> => {
  const params = filterSchema.parse(ctx.meta);

  const { data } = await api.get<ApiSuccessResponse<AllRoleResponse>>("/role", {
    params,
    ...apiConfigWithCredentials(),
  });
  const formattedItemData = data.data.items.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));

  return {
    ...data,
    data: {
      ...data.data,
      items: formattedItemData,
    },
  };
};

export const roleQueryKey = createQueryKeys("role", {
  all: (ctx: FilterSchema) => ({
    queryKey: [ctx],
    queryFn: allRoleQueryFn,
  }),
});
