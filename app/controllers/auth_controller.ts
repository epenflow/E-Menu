import HttpStatusCode from '#enums/http_statuses'
import User from '#models/user'
import { signInValidator } from '#validators/auth'
import BaseApiController from './base_api_controller.js'

export default class AuthController extends BaseApiController {
  async signIn() {
    const { username, password } = await signInValidator.validate(this.ctx.request.all())

    const user = await User.verifyCredentials(username, password)

    await user.load('role')

    const token = await User.accessTokens.create(user, user.role.abilities)

    return this.success(
      `Welcome back ${user.username}!`,
      {
        user: user.toJSON(),
        token: token.toJSON(),
      },
      HttpStatusCode.Ok
    )
  }

  async signOut() {
    const user = await this.ctx.auth.authenticate()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return this.success(`Sign - out successfully`)
  }
}
