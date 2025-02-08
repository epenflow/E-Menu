import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class ForbiddenException extends Exception {
  static status: number = 403
  static message?: string | undefined = 'You do not have permission to access this resource.'
  static code?: string | undefined = 'E_FORBIDDEN_RESOURCES'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      errors: [
        {
          message: error.message,
        },
      ],
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ error: error }, error.message)
  }
}
