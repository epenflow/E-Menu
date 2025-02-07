import ROLES from '#enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', {
          primaryKey: true,
          useBinaryUuid: true,
        })
        .defaultTo(this.raw('uuid_generate_v4()'))

      table.string('username', 100).notNullable().unique()
      table.string('password').notNullable()

      table
        .enum('role', Object.values(ROLES), {
          enumName: 'ROLES',
          useNative: true,
          existingType: true,
        })
        .defaultTo(ROLES.CASHIER)
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
