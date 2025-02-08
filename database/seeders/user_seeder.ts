import { UserFactory } from '#database/factories/user_factory'
import ROLES from '#enums/roles'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // await UserFactory.merge({ username: 'ADMIN', password: 'admin' }).create()
    await UserFactory.merge({ role: ROLES.CASHIER }).createMany(100)
  }
}
