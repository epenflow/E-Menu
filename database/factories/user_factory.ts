import User from '#models/user'
import factory from '@adonisjs/lucid/factories'

export const UserFactory = factory
  .define(User, async () => {
    return {
      fName: 'epen',
      lName: 'flow',
      email: 'epenflow@gmail.com',
      username: 'epenflow',
      password: 'admin',
      roleId: 1,
    }
  })
  .build()
