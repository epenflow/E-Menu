import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Auth', (group) => {
  const baseURL = '/api/auth/sign_in'
  group.each.setup(() => testUtils.db().truncate())

  test('pass: user can sign in successfully', async ({ client }) => {
    const password = 'test'
    const user = await UserFactory.merge({ password }).create()

    const response = await client.post(baseURL).json({
      username: user.username,
      password,
    })

    response.assertStatus(200)
    response.assertTextIncludes('user')
    response.assertTextIncludes('token')
    response.assertBodyContains({
      user: {
        username: user.username,
      },
    })
  })

  test('fail: user cannot sign in with invalid credentials', async ({ client }) => {
    const response = await client.post(baseURL).json({
      username: 'test',
      password: 'test',
    })

    response.hasError()
    response.assertBodyContains({
      errors: [
        {
          message: 'Invalid user credentials',
        },
      ],
    })
  })
})
