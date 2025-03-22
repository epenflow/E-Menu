import Role from '#models/role'
import { paginationValidator } from '#validators/pagination'
import type { HttpContext } from '@adonisjs/core/http'
import BaseApiController from './base_api_controller.js'

export default class RolesController extends BaseApiController {
  /**
   * Display a list of resource
   */
  async index() {
    const { request } = this.ctx
    this.ctx.logger.info(RolesController.name)

    const { page, limit } = await paginationValidator.validate(request.all())

    const rows = await Role.query().paginate(page || 1, limit)
    const roles = rows.toJSON()

    return this.success('Success get all roles', {
      meta: roles.meta,
      items: roles.data,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
