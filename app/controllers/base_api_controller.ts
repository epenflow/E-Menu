import HttpStatusCode from '#enums/http_statuses'
import type { ApiErrorResponse, ApiSuccessResponse, BaseErrorResponse } from '#types/index'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BaseApiController {
  constructor(protected ctx: HttpContext) {}

  success<T = undefined>(message: string, data?: T, code: number = HttpStatusCode.Ok) {
    const response: ApiSuccessResponse<T> = {
      status: code,
      success: true,
      message,
      data,
    }

    return response
  }

  error<T = BaseErrorResponse>(
    message: string,
    errors?: T[],
    code: number = HttpStatusCode.BadRequest
  ) {
    const response: ApiErrorResponse<T> = {
      status: code,
      success: false,
      message,
      errors,
    }

    this.ctx.response.status(code).send(response)
  }
}
