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

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
router
  .group(() => {
    router.resource('user', UsersController).use(
      '*',
      middleware.auth({
        guards: ['api'],
      })
    )

    router
      .group(() => {
        router.post('sign_in', [AuthController, 'signIn'])
      })
      .prefix('auth')
  })
  .prefix('api')
