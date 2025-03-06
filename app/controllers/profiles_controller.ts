import {
  destroyProfileValidator,
  updateProfilePasswordValidator,
  updateProfileValidator,
} from '#validators/profile'
import { type HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
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

  showPassword(ctx: HttpContext) {
    return ctx.inertia.render('settings/password')
  }

  async handleUpdatePassword(ctx: HttpContext) {
    const data = await updateProfilePasswordValidator.validate(ctx.request.all())
    if (!(await hash.verify(ctx.auth.user!.password, data.currentPassword))) {
      ctx.session.flashErrors({
        currentPassword: 'Invalid user credentials',
      })

      return ctx.response.redirect().toRoute('show.password')
    }

    ctx.auth.user?.merge({ password: data.newPassword })
    await ctx.auth.user?.save()

    ctx.session.flash('success', 'Update password successfully!')

    return ctx.response.redirect().toRoute('show.password')
  }

  async handleDestroy(ctx: HttpContext) {
    const { password } = await ctx.request.validateUsing(destroyProfileValidator)

    if (!(await hash.verify(ctx.auth.user!.password, password))) {
      ctx.session.flashErrors({
        password: 'Invalid user credentials',
      })

      return ctx.response.redirect().toRoute('show.profile')
    } else {
      await ctx.auth.user?.delete()

      ctx.session.flash('success', 'Delete user successfully!')

      return ctx.response.redirect().toRoute('show.sign_in')
    }
  }
}
