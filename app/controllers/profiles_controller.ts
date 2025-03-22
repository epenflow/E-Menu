import HttpStatusCode from '#enums/http_statuses'
import User from '#models/user'
import { updatePasswordValidator, updateProfileValidator } from '#validators/profile'
import BaseApiController from './base_api_controller.js'

export default class ProfilesController extends BaseApiController {
  async updateProfile() {
    const user = await User.findOrFail(this.ctx.auth.user?.id)

    const payload = await updateProfileValidator.validate(this.ctx.request.all(), {
      meta: {
        id: user.id,
      },
    })

    await user.merge(payload).save()

    return this.success(`Update ${user.username} successfully!`, user.toJSON())
  }
  async updatePassword() {
    const { currentPassword, newPassword } = await updatePasswordValidator.validate(
      this.ctx.request.all()
    )
    console.log('Invoke update-password')

    const user = await User.findOrFail(this.ctx.auth.user?.id)

    if (!(await user.verifyPassword(currentPassword))) {
      return this.error(
        'Current password is incorrect',
        [
          {
            field: 'currentPassword',
            message: 'Invalid credentials',
          },
        ],
        HttpStatusCode.UnprocessableEntity
      )
    }

    await user.merge({ password: newPassword }).save()

    return this.success('Update password successfully')
  }
}
