import User from '#models/user'
import { signInValidator, signUpValidator } from '#validators/auth'
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

  showSignUp(ctx: HttpContext) {
    return ctx.inertia.render('auth/sign-up')
  }

  async handleSignUp(ctx: HttpContext) {
    const data = await signUpValidator.validate(ctx.request.all())

    await User.create(data)

    ctx.response.redirect().toRoute('show.sign_in')
  }

  async handleSignOut(ctx: HttpContext) {
    await ctx.auth.use('web').logout()

    return ctx.response.redirect('/')
  }
}
