import HttpStatusCode from '#enums/http_statuses'
import Role from '#models/role'
import { paginationValidator } from '#validators/pagination'
import BaseApiController from './base_api_controller.js'

export default class HomeController extends BaseApiController {
  async index() {
    const { limit, page } = await paginationValidator.validate(this.ctx.request.all())
    const roles = await Role.query().paginate(page || 1, limit)

    return this.success(
      'Success',
      {
        items: roles.toJSON().data,
        meta: roles.toJSON().meta,
      },
      HttpStatusCode.Ok
    )
  }
}
