import User from '#models/user'
import { signInValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  showSignIn(ctx: HttpContext) {
    return ctx.inertia.render('auth/sign-in')
  }
  async handleSignIn(ctx: HttpContext) {
    const { username, password } = await signInValidator.validate(ctx.request.all())

    const user = await User.verifyCredentials(username, password)

    await ctx.auth.use('web').login(user)

    ctx.response.redirect('/test')
  }

  async handleSignOut(ctx: HttpContext) {
    await ctx.auth.use('web').logout()

    return ctx.response.redirect('/')
  }
}
