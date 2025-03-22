import { RoleFactory } from '#database/factories/role_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private roles = [
    'super admin',
    'accountant',
    'admin',
    'staff',
    'chef',
    'cashier',
    'waitress',
    'manager',
    'host',
    'bartender',
  ]
  async run() {
    this.roles.forEach(async (role) => {
      await RoleFactory.merge({ name: role }).create()
    })
  }
}
