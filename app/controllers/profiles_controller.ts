import User from '#models/user'
import { destroyProfileValidator, updateProfileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  showProfile(ctx: HttpContext) {
    return ctx.inertia.render('settings/profile')
  }

  async handleUpdateProfile(ctx: HttpContext) {
    const data = await updateProfileValidator.validate(ctx.request.all(), {
      meta: {
        id: ctx.auth.user?.id,
      },
    })

    ctx.auth.user?.merge(data)
    await ctx.auth.user?.save()

    ctx.session.flash('success', 'Your profile has been updated successfully!')

    return ctx.response.redirect().toRoute('show.profile')
  }

  async handleDestroy(ctx: HttpContext) {
    const { password } = await ctx.request.validateUsing(destroyProfileValidator)

    const user = await User.verifyCredentials(ctx.auth.user!.email, password)
    await ctx.auth.use('web').logout()
    await user.delete()

    ctx.session.flash('success', 'Delete user successfully')

    return ctx.response.redirect().toRoute('show.profile')
  }
}
