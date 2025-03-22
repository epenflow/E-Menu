export type ApiBaseResponse<T = undefined> = {
  success: boolean
  status: number
  message: string
} & T
export type ApiSuccessResponse<T = undefined> = ApiBaseResponse<{ data?: T }>
export type BaseErrorResponse =
  | { field: string; message: string; rule?: string; meta?: unknown }
  | { message: string }

export type ApiErrorResponse<T = BaseErrorResponse> = ApiBaseResponse<{
  errors?: T[]
}>
