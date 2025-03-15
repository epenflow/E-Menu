import type { FormApi } from "@tanstack/react-form";

export type Paginator = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type PaginateResponse<T = undefined> = {
  meta: Paginator;
  data: T;
};
export type AuthToken = {
  type: string;
  name: string | null;
  token: string | undefined;
  abilities: string[];
  lastUsedAt: Date | null;
  expiresAt: Date | null;
};

export type User<T = undefined> = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
} & T;

export type Role = {
  id: string;
  name: string;
  abilities: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type ApiErrorResponse<T = undefined> = {
  errors: [{ message?: string } & T];
};

export type OnSubmitAsyncValidatorProps<T> = {
  value: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formApi: FormApi<T, any, any, any, any, any, any, any, any, any>;
  signal: AbortSignal;
};
