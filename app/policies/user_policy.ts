import ForbiddenException from '#exceptions/forbidden_exception'
import type User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'

export default class UserPolicy extends BasePolicy {
  isAdmin(user: User) {
    if (user.isAdmin) {
      return true
    }

    throw new ForbiddenException()
  }
}
