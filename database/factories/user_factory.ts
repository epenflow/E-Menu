import ROLES from '#enums/roles'
import User from '#models/user'
import factory from '@adonisjs/lucid/factories'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.username(),
      password: faker.internet.password(),
      role: ROLES.ADMIN,
    }
  })
  .build()
