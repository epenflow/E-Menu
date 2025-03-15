import type { QueryFunctionContext } from "@tanstack/react-query";
import { paginationSchema } from "~/hooks/pagination";
import api, { apiToken } from "~/lib/api";
import type { AllRoleResponse } from "./type";

export const allRoleQueryFn = async (ctx: QueryFunctionContext) => {
  const params = paginationSchema.parse(ctx.meta);

  const { data } = await api.get<AllRoleResponse>("/role", {
    params,
    headers: {
      ...apiToken(),
    },
  });

  return data;
};
