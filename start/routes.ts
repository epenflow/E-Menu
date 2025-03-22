/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.get('/home', '#controllers/home_controller.index')

router
  .group(() => {
    router
      .group(() => {
        router.post('sign-in', '#controllers/auth_controller.signIn')

        router.post('sign-out', '#controllers/auth_controller.signOut').use(
          middleware.auth({
            guards: ['api'],
          })
        )
      })
      .prefix('auth')

    router
      .group(() => {
        router
          .group(() => {
            router.patch('update-profile', '#controllers/profiles_controller.updateProfile')

            router.patch('update-password', '#controllers/profiles_controller.updatePassword')
          })
          .prefix('profile')

        router.resource('role', '#controllers/roles_controller')
      })
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('api')
