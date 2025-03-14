import type { PaginateResponse } from "~/lib/types";

export type AllRoleResponse = PaginateResponse<
  {
    id: string;
    name: string;
    abilities: string[];
    createdAt: string;
    updatedAt: string;
  }[]
>;
