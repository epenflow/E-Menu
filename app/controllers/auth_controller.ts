import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  /**
   * Validator for the sign-in process.
   *
   * This private validator ensures that the `username` and `password` fields
   * are strings with a minimum length of 1 character.
   *
   * @private
   */
  #signInValidator = vine.compile(
    vine.object({
      username: vine.string().minLength(1),
      password: vine.string().minLength(1),
    })
  )

  /**
   * Handles the sign-in process for a user.
   *
   * @param {HttpContext} context - The HTTP context containing the request object.
   * @throws {ValidationException} - If the request data fails validation.
   * @throws {AuthenticationException} - If the user credentials are invalid.
   */
  async signIn({ request, response }: HttpContext) {
    /**
     * Validates the sign-in request data.
     *
     * @throws {ValidationException} - If the request data fails validation.
     */
    const data = await this.#signInValidator.validate(request.all())

    /**
     * Verifies the user credentials.
     *
     * @param {string} data.username - The username provided by the user.
     * @param {string} data.password - The password provided by the user.
     * @throws {AuthenticationException} - If the user credentials are invalid.
     * @returns {User} - The authenticated user.
     */
    const user = await User.verifyCredentials(data.username, data.password)

    /**
     * Creates an access token for the authenticated user.
     *
     * @param {User} user - The authenticated user.
     * @param {string[]} abilities - The scopes for the access token.
     * @returns {Token} - The created access token.
     */
    const token = await User.accessTokens.create(user, ['*'])

    return response.json({
      user: user.toJSON(),
      token: token.toJSON(),
    })
  }
}
