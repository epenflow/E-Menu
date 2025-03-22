import Role from '#models/role'
import factory from '@adonisjs/lucid/factories'

export const RoleFactory = factory
  .define(Role, async () => {
    return {
      name: 'admin',
      abilities: ['create', 'update', 'read', 'delete'],
    }
  })
  .build()
