import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    // await UserFactory.create()
    await UserFactory.merge({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    }).create()
    await UserFactory.merge({
      username: 'epenflow',
      email: 'epenflow@gmail.com',
      password: 'admin',
    }).create()
  }
}
