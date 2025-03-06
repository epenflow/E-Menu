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

router.on('/').renderInertia('home').as('home')

const AuthController = () => import('#controllers/auth_controller')
router
  .group(() => {
    router.get('sign-in', [AuthController, 'showSignIn']).as('show.sign_in')
    router.post('sign-in', [AuthController, 'handleSignIn']).as('handle.sign_in')

    router.get('sign-up', [AuthController, 'showSignUp']).as('show.sign_up')
    router.post('sign-up', [AuthController, 'handleSignUp']).as('handle.sign_up')

    router
      .get('sign-out', [AuthController, 'handleSignOut'])
      .use(middleware.auth({ guards: ['web'] }))
      .as('handle.sign_out')
  })
  .prefix('auth')

router
  .on('/dashboard')
  .renderInertia('dashboard')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
  .as('dashboard')

const ProfilesController = () => import('#controllers/profiles_controller')
router
  .group(() => {
    router.get('profile', [ProfilesController, 'showProfile']).as('show.profile')
    router.get('password', [ProfilesController, 'showPassword']).as('show.password')

    router.patch('profile/update', [ProfilesController, 'handleUpdateProfile'])
    router.patch('profile/update-password', [ProfilesController, 'handleUpdatePassword'])
    router.delete('profile/destroy', [ProfilesController, 'handleDestroy'])
  })
  .prefix('settings')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
