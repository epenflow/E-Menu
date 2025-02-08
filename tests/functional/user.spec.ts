import { UserFactory } from '#database/factories/user_factory'
import ROLES from '#enums/roles'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User Management', (group) => {
  const baseURL = '/api/user'

  group.each.setup(() => testUtils.db().truncate())

  test('pass : only admin role can access the list of users', async ({ client }) => {
    const admin = await UserFactory.merge({ role: ROLES.ADMIN }).create()

    const response = await client.get(baseURL).withGuard('api').loginAs(admin)
    response.assertStatus(200)
    response.hasBody()
  })

  test('fail : non-admin role cannot access the list of users', async ({ client }) => {
    const cashier = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const response = await client.get(baseURL).withGuard('api').loginAs(cashier)
    response.assertStatus(403)
    response.assertBodyContains({
      errors: [
        {
          message: 'You do not have permission to access this resource.',
        },
      ],
    })
  })

  test('pass : only admin role can access the individual user', async ({ client }) => {
    const admin = await UserFactory.merge({ role: ROLES.ADMIN }).create()

    const response = await client
      .get(baseURL + '/' + admin.id)
      .withGuard('api')
      .loginAs(admin)
    response.assertStatus(200)
    response.hasBody()
  })

  test('fail : non-admin role cannot access the individual user', async ({ client }) => {
    const cashier = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const response = await client
      .get(baseURL + '/' + cashier.id)
      .withGuard('api')
      .loginAs(cashier)
    response.assertStatus(403)
    response.assertBodyContains({
      errors: [
        {
          message: 'You do not have permission to access this resource.',
        },
      ],
    })
  })

  test('pass : admin can create a new user', async ({ client }) => {
    const admin = await UserFactory.merge({ role: ROLES.ADMIN }).create()
    const data = {
      username: 'test',
      password: 'test',
      role: ROLES.CASHIER,
    }

    const response = await client.post(baseURL).json(data).withGuard('api').loginAs(admin)

    response.assertStatus(200)
    response.hasBody()
    response.assertBodyContains({
      id: response.body().id,
      username: data.username,
      role: data.role,
      createdAt: response.body().createdAt,
      updatedAt: response.body().updatedAt,
    })
  })

  test('fail : non-admin role cannot create a new user', async ({ client }) => {
    const cashier = await UserFactory.merge({ role: ROLES.CASHIER }).create()
    const data = {
      username: 'test',
      password: 'test',
      role: ROLES.CASHIER,
    }
    const response = await client.post(baseURL).json(data).withGuard('api').loginAs(cashier)

    response.assertStatus(403)
    response.assertBodyContains({
      errors: [
        {
          message: 'You do not have permission to access this resource.',
        },
      ],
    })
  })

  test('pass : admin can update the user', async ({ client }) => {
    const admin = await UserFactory.merge({ role: ROLES.ADMIN }).create()
    const user = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const data = {
      username: 'Test',
      role: ROLES.ADMIN,
    }

    const response = await client
      .patch(baseURL + '/' + user.id)
      .withGuard('api')
      .loginAs(admin)
      .json(data)

    response.assertStatus(200)
    response.assertBodyContains(data)
  })

  test('fail : non-admin role cannot update the user', async ({ client }) => {
    const cashier = await UserFactory.merge({ role: ROLES.CASHIER }).create()
    const user = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const data = {
      username: 'Test',
      role: ROLES.ADMIN,
    }

    const response = await client
      .patch(baseURL + '/' + user.id)
      .withGuard('api')
      .loginAs(cashier)
      .json(data)

    response.assertStatus(403)
    response.hasError()
    response.assertBodyContains({
      errors: [
        {
          message: 'You do not have permission to access this resource.',
        },
      ],
    })
  })

  test('pass : admin can delete the user', async ({ client }) => {
    const admin = await UserFactory.merge({ role: ROLES.ADMIN }).create()
    const user = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const response = await client
      .delete(baseURL + '/' + user.id)
      .withGuard('api')
      .loginAs(admin)

    response.assertStatus(200)
    response.hasBody()
    response.assertBodyContains({
      success: [
        {
          message: 'Ok',
          status: true,
        },
      ],
    })
  })

  test('fail : non-admin role cannot delete the user', async ({ client }) => {
    const cashier = await UserFactory.merge({ role: ROLES.CASHIER }).create()
    const user = await UserFactory.merge({ role: ROLES.CASHIER }).create()

    const response = await client
      .delete(baseURL + '/' + user.id)
      .withGuard('api')
      .loginAs(cashier)

    response.assertStatus(403)
    response.hasError()
    response.assertBodyContains({
      errors: [
        {
          message: 'You do not have permission to access this resource.',
        },
      ],
    })
  })
})
